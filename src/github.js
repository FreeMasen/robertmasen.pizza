var request = require('request');
var mongo = require('mongojs');
var fs = require('fs');
var db = mongo('rm', ['tokens', 'github']);

let token

function getToken(cb) {
    if (token) {
        cb(null, token)
    }
    db.tokens.findOne({name: "gh"}, (err, doc) => {
        if (err) { 
            cb(err);
            return;
        }
        if (!doc.token) {
            cb(new Error('Cound not find gh token'));
            return;
        }
        cb(null, doc.token)
    })
}

function requestRepoInfo(cb) {
    getToken((err, token) => {
        if (err){
             cb(err)
             return
        }
        let opts = composeRequestOptions(token)
        request.get('https://api.github.com/users/freemasen/repos?type=all&sort=created&direction=desc',opts
        , (err, res, body) => {
            if (err) {
                cb(err);
                return
            }
            cb(null, mapRepos(filterRepos(body)))

        })
    })
}

function cleanLink(link) {
    let first = link.split(';')[0]
    let end = first.length -2
    return first.substring(1,end)
}

function requestEvents(cb) {
    getToken((err, token) => {
        if (err){
            cb(err)
            return
        }
        let opts = composeRequestOptions(token)
        request('https://api.github.com/users/freemasen/events', opts, (err, res, body) => {
            if (err) {
                cb(err)
                return
            }
            cb(null, mapEvents(filterEvents(body)))
        })
    })
}

function composeRequestOptions(token) {
    return {
        auth: {
            user: token
        },
        headers: {
            'User-Agent': 'freemasen'
        }
    }
} 

function filterRepos(repos) {
    let parsed = JSON.parse(repos)
    let ordered = parsed.sort((lhs, rhs) => {
        let lhsTime = new Date(lhs.created_at).getTime() / 1000
        let rhsTime = new Date(rhs.created_at).getTime() / 1000
        return rhsTime - lhsTime
    })
    return ordered.filter((repo) => {
        if (repo.name == 'FreeMasen/robertmasen.pizza') console.log(repo)
        return repo.description != null &&
            repo.description != ''
    })
}

function mapRepos(repos) {
    return repos.map((repo) => {
        return {
            name: repo.name,
            url: repo.html_url,
            mine: repo.owner.login == 'FreeMasen',
            stars: repo.stargazers_count,
            language: repo.language,
            description: repo.description
        }
    })
}

function filterEvents(events) {
    let parsed = JSON.parse(events)
    let preFiltered = parsed.filter((event) => {
        return event.type == 'PushEvent'
    })
    return preFiltered.splice(0, 10)
}

function mapEvents(events) {
    return events.map((event) => {
        let r = {
            time: new Date(event.created_at).toLocaleString(),
            repo: {
                name: event.repo.name.split('/')[1],
                url: 'https://github.com/' + event.repo.name
            }
        }
        if (event.payload.commits) {
            r.message = event.payload.commits.map((commit) => {
                        return commit.message    
                        })
        }
        return r
    })
}

module.exports = {
    repos: requestRepoInfo,
    events: requestEvents
}
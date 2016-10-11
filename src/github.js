var request = require('request');
var mongo = require('mongojs');
var fs = require('fs');
var db = mongo('rm', ['tokens']);


function getToken(cb) {
    db.tokens.findOne({name: "gh"}, (err, doc) => {
        if (err) { 
            cb(err);
            return;
        }
        if (!doc.token) {
            cb(new Error('Cound not find gh token'));
            return;
        }
        cb(null, doc)
    })
}

function requestRepoInfo(cb) {
    getToken((err, doc) => {
        if (err){
             cb(err)
             return
        }
        let opts = composeRequestOptions(doc.token)
        request.get('https://api.github.com/users/freemasen/repos',opts
        , (err, res, body) => {
            if (err) {
                cb(err);
                return
            }
            
            cb(null, mapRepos(filterRepos(body)))  
        })
    })
}

function requestEvents(cb) {
    getToken((err, doc) => {
        if (err){
            cb(err)
            return
        }
        let opts = composeRequestOptions(doc.token)
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
    return parsed.filter((repo) => {
        return repo.homepage != null &&
            repo.homepage != ''

    })
}

function mapRepos(repos) {
    return repos.map((repo) => {
        return {
            name: repo.name,
            url: repo.html_url,
            mine: repo.owner.login == 'FreeMasen',
            stars: repo.stargazers_count,
            language: repo.language
        }
    })
}

function filterEvents(events) {
    return events.splice(0, 10)
}

function mapEvents(events) {
    return events.map((event) => {
        return {
            time: event.created_at,
            repo: {
                name: event.repo.name.split('/')[1],
                url: event.repo.url
            },
            message: event.commits[0].message,
            
        }
    })
}

module.exports = {
    repos: requestRepoInfo,
    events: requestEvents
}

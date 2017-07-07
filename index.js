app = require('./src/configure.js')
let github = require('./src/github.js')
let mongo = require('mongojs')
let db = mongo('rm.p:superPowers@localhost/rm', ['jobs', 'about'])
const contact = require('./src/contact.js')

function removeAuthentication() {
    db = mongo('rm', ['jobs', 'about'])
}

db.on('error', _ => {

})

app.get('/about', (req, res) => {
    console.log('req to /resume');
    let retried = false
    let callback = function(err, docs) {
        if (err) {
            if (err.code == 18) {
                removeAuthentication()
                if (!retried) {
                    console.log('Unable to request because of auth, retrying')
                    return findRequest('about', callback)
                } else {
                    console.log('error after retry',err)
                    return res.status(404).send()
                }
            }
        }
        res.send(JSON.stringify(docs))
    }
    findRequest('about', callback)
})

app.get('/resume', (req, res) => {
    console.log('/resume request')
    let retried = false
    let callback = function(err, docs) {
        console.log('resume callback')
        if (err) {
            if (err.code == 18) {
                removeAuthentication()
                if (!retried) {
                    console.log('Unable to request because of auth, retrying')
                    return findRequest('jobs', callback)
                } else {
                    console.log('error after retry',err)
                    return res.status(404).send()
                }
            }
        }
        let filteredJobs = docs.filter((x) => {
            return x.collection == 'jobs'
        })

        let filteredNonJobs = docs.filter((x) => {
            return x.collection == 'nonjobs'
        })

        let body = {
                jobs: { 
                    name: 'Work Experience',
                    experiences: filteredJobs
                    },
                nonjobs: {
                    name: 'Non-Work Experience',
                    experiences: filteredNonJobs
                }
            }

        res.send(JSON.stringify(body));
    }
    findRequest('jobs', callback)
})

function findRequest(collection, cb) {
    db[collection].find({}, (err, docs) => {
        return cb(err, docs)
    })
}

app.get('/portfolio', (req, res) => {
    github.events((err, events) => {
        if (err) {
            res.status(403).send()
            console.log(err)
            return
        }
        github.repos((err2, repos) => {
            if (err2) {
                res.status(403).send()
                console.log(err2)
                return
            }
            github.vis((err3, visuals) => {
                if (err3) return res.status(403).send()
                let r = {
                    repos: repos,
                    events: events,
                    visuals: visuals
                }
                res.send(JSON.stringify(r))
            })
        })
    })
});

app.get('/portfolio/events', (req, res) => {
    github.events((err, events) => {
        res.send(JSON.stringify(events));
    });

});

app.post('/contact', (req, res) => {
    contact(req.body, (err) => {
        if (err) {
            console.log(err.message)
            return res.status(400).send()
        }
        res.send()
    })
})

app.listen(8080, (err) => {
    if (err) {
        throw err;
    }
    console.log('listening on 8080')
})


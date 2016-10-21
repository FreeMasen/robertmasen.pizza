app = require('./src/configure.js')
let github = require('./src/github.js')
let mongo = require('mongojs')
let db = mongo('rm', ['jobs', 'about', 'contact'])

app.get('/about', (req, res) => {
    console.log('req to /resume');
    db.about.find({}, (err, docs) => {
        if (err) throw err
        res.send(JSON.stringify(docs))
    })      
})

app.get('/resume', (req, res) => {
    db.jobs.find({}, (err, docs) => {
        let filteredJobs = docs.filter((x) => {
            return x.collection == 'jobs'
        })

        let filteredNonJobs = docs.filter((x) => {
            return x.collection == 'nonjobs'
        })

        let body = {
                jobs: { 
                    name: 'Work Experince',
                    experiences: filteredJobs
                    },
                nonjobs: {
                    name: 'Non-Work Experience',
                    experiences: filteredNonJobs
                }
            }

        res.send(JSON.stringify(body));
    })
})

app.get('/portfolio', (req, res) => {
    github.events((err, events) => {
        if (err) {
            res.status(403).send()
            console.log(err)
            return
        }
        github.repos((err2, repos) => {
            if (err2) {
                res.send(403).send()
                return
            }
            let r = {
                repos: repos,
                events: events
            }
            res.send(JSON.stringify(r))
        })
    })
})

app.post('/contact', (req, res) => {
    db.contact.insert(req.body, (err) => {
        if (err) {
            res.status(500).send()
        } else {
            res.send('Message Sent')
        }
    })
})

app.listen(8080, (err) => {
    if (err) {
        throw err;
    }
    console.log('listening on 8080')
})


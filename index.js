app = require('./src/configure.js')

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
        if (err) throw err
        github.repos((err, repos) => {
            if (err) throw err
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


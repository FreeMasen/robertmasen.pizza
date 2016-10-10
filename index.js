const express = require('express')
const app = express()
const mongo = require('mongojs')
const morgan = require('morgan')
const compression = require('compression')
const bodyparser = require('body-parser')

const db = new mongo('rm', ['jobs', 'nonjobs', 'about']);

const github = require('./src/github.js');


const fs = require('fs')

app.use(compression())
app.use(express.static('www'));
app.use(morgan('dev'))
app.use(bodyparser.json())

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
    github((err, resp, body) => {
        res.send(body);
    })
})

app.post('/contact', (req, res) => {
    let x = Math.random();
    console.log(req.body)
    if (x>0) {
        res.send('Message Sent')
    } else {
        res.status(500).send('Unable to send response')
    }
})

app.listen(8080, (err) => {
    if (err) {
        console.log('error: ')
        console.log(err)
        throw err;
    }
    console.log('listening on 8080')
})


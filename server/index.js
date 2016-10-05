var express = require('express')
var app = express()
var mongo = require('mongojs')
var morgan = require('morgan')
var favicon = require('express-favicon')
const compression = require('compression')

var db = new mongo('rm', ['jobs', 'nonjobs', 'about']);

var github = require('./src/github.js');


var fs = require('fs')

app.use(compression())
app.use(express.static('../www'));
app.use(morgan('dev'))
app.use(favicon('../www/img/favicon.png'))

app.get('/about', (req, res) => {
    console.log('req to /resume');
    db.about.find({}, (err, docs) => {
        if (err) throw err
        res.send(JSON.stringify(docs))
    })      
})

app.get('/resume', (req, res) => {
    db.jobs.find({}, (err, docs) => {
        console.log(docs.length)
        var filteredJobs = docs.filter((x) => {return x.collection == 'jobs'})
        console.log(filteredJobs)
        var filteredNonJobs = docs.filter((x) => {return x.collection == 'nonjobs'})
        console.log(filteredNonJobs)

        var body = {
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

app.listen(8080, (err) => {
    if (err) throw err;
    console.log('listening on 8080')
})


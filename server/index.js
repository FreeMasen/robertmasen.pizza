var express = require('express');
var app = express();
var mongo = require('mongojs');
var morgan = require('morgan');

var db = new mongo('rm', ['resume']);

//to be replaced with gh
var fs = require('fs')


app.use(express.static('../www'));
app.use(morgan('combined'))

app.get('/lately', (req, res) => {
    console.log('req to /lately');
    fs.readFile('response.txt', (err, data) => {
        if (err) throw err;
        res.body = data;
        res.send();
    });
})

app.get('/resume', (req, res) => {
    fs.readFile('jobs.json', 'utf8', (err, jobsData) => {
        if (err) throw err;
        fs.readFile('nonJobs.json', 'utf8', (err, nonJobsData) => {
            if (err) throw err;
            var body = {
                jobs: {
                name: 'Work Experience',
                experiences: JSON.parse(jobsData)
                },
                nonJobs: {
                name: 'Non-Work Experience',
                experiences: JSON.parse(nonJobsData)
                }
            }
            res.send(JSON.stringify(body));
        })
    })
});

app.listen(8080, (err) => {
    if (err) throw err;
    console.log('listening on 8080')
})


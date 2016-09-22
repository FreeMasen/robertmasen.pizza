var express = require('express');
var app = express();
var mongo = require('mongojs');
var db = new mongo('rm', ['resume']);

//to be replaced with gh
var fs = require('fs')


app.use(express.static('../www'));

app.get('/projects', (req, res) => {
    
});

app.get('/lately', (req, res) => {

})

app.post('/projects', (req, res) => {
    
});

app.listen(8080, (err) => {
    if (err) throw err;
    console.log('listening on 8080')
})


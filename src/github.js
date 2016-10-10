var request = require('request');
var mongo = require('mongojs');
var fs = require('fs');
var db = mongo('rm', ['tokens']);


function getToken(cb) {
    db.tokens.findOne({name: "gh"}, (err, doc) => {
        cb(err, doc);
    })
}

function requestRepoInfo(cb) {
    getToken((err, doc) => {
        if (err) { 
            cb(err);
            return;
        }
        if (!doc.token) {
            cb(new Error('Cound not find gh token'));
            return;
        }
        request.get('https://api.github.com/users/freemasen/events', {
            auth: {
                user: doc.token
            },
            headers: {
                "User-Agent": "freemasen"
            }
        }, (err, res, body) => {
            if (err) {
                cb(err);
                return
            }
            fs.writeFile(process.cwd() + '/response.txt', body ,(e) => {})
            cb(undefined, res, body)
        })
    })
}

module.exports = requestRepoInfo;
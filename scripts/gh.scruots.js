const request = require('request')

const mongo = require('mongojs')
const db = mongo('rm', ['tokens'])
const fs = require('fs')

db.tokens.findOne({ name: 'gh' }, (err, doc) => {
    if (!doc) throw new Error('no token doc')
    let opts = {
        auth: {
            user: doc.token
        },
        headers: {
            'User-Agent': 'freemasen'
        }
    }
    request.get('https://api.github.com/FreeMasen/repos?type=fork', opts, (err, res, body) => {
        if (err) throw err
        fs.writeFile('ghForks.json', body, (err) => {
            if (err) throw err
            process.exit()
        })
    })
})
const mongo = require('mongojs')
let db = mongo('rm', ['jobs', 'about', 'contact'])
const fs = require('fs')

function extract() {
    db.jobs.find({}, (err, docs) => {
        if (!err) {
            fs.writeFileSync('jobs.json', JSON.stringify(docs))
        } else {
            throw err
        }
        db.about.find({}, (err, docs) => {
            if (!err) {
                fs.writeFileSync('about.json', JSON.stringify(docs))
            } else {
            throw err
        }
        })
    })
}

extract()
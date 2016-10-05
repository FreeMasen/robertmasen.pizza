var mongo = require('mongojs')
var fs = require('fs')

var db = mongo('rm', ['jobs', 'nonjobs', 'about'])


function dropAndInsert(coll) {
    console.log('starting dropAndInsert for ' + coll)
    db[coll].drop((err, docs) => {
        if (err) {
            if (!err.code == 26) {
                console.log('error dropping ' + err.code)
                throw err
            }
        }
        console.log(coll + ' drop complete')
        fs.readFile('../server/' + coll + '.json', (err, data) => {
            if (err) console.log('err reading ' + err)
            var objs = JSON.parse(data);
            db[coll].insert(objs, (err, docs) => {
                if (err) throw err
                console.log(coll + ' insert complete')
            })
        })
    })
}

console.log(db)


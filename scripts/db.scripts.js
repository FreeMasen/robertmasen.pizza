var mongo = require('mongojs')
var fs = require('fs')

var db = mongo('rm', ['jobs', 'nonjobs', 'about', 'projects'])


function dropAndInsert(coll, fn, drop) {
    if (!fn) fn = coll + '.json'
    if (drop == true) {
        dropColl(coll, fn)
    } else {
        read(coll, fn)
    }
}

function dropColl(coll, fn) {
    console.log('dropping ' + coll)
    db[coll].drop((err) => {
        if (err) {
            if (err.code != 26) {
                throw err
            }
        }
        read(coll, fn)
    })
}

function read(coll, fn) {
    console.log('reading ' +  fn)
    fs.readFile(fn, 'utf8', (err, data) => {
        var objs = JSON.parse(data)
        insert(coll, objs)
    })
}

function insert(coll, objs) {
    console.log('inserting into ' + coll)
    db[coll].insert(objs, (err) => {
        if (err) throw err
        process.exit(0)
    })
}

dropAndInsert(process.argv[2], process.argv[3], process.argv[4])

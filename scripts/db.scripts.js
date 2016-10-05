var mongo = require('mongojs')
var fs = require('fs')

var db = mongo('rm', ['jobs', 'nonjobs', 'about'])


function dropAndInsert(coll, fn, drop) {
    if (!fn) fn = coll
    if (drop) {
        dropColl(coll, fn)
    } else {
        read(coll, fn)
    }
}

function dropColl(coll, fn) {
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
    fs.readFile(fn, 'utf8', (err, data) => {
        console.log(err)
        console.log(data)
        var objs = JSON.parse(data)
        insert(coll, objs)
    })
}

function insert(coll, objs) {
    db[coll].insert(objs, (err) => {
        if (err) throw err
        process.exit(0)
    })
}


const coll = process.argv[2]
const fn = process.argv[3]
const drop = process.argv[4]
console.log(drop)
dropAndInsert(coll, fn, drop)
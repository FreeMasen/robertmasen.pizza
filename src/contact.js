const mongo = require('mongojs')
const db = mongo('rm', ['contact'])

function addContact(obj, cb) {
    db.contact.insert(obj, (err) => {
        if (err) {
            cb(err)
        } else {
            cb(null)
        }
    })
}

module.exports = addContact
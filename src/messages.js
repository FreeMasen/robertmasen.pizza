const mongo = require('mongojs')
const db = mongo('rm', ['contact'])

function getMessages(cb) {
    db.contact.find({read: false}, (err, docs) => {
        if (err) {
            return cb(err)
        } 
        cb(null, docs)
    })
}

function markRead(messageId, cb) {
    db.contact.findAndModify({query: {_id: messageId},
                                update: { $set: { read: true } }
                            }, (err, docs) => {
        if (err) {
            return cb(err)
        }
        return (null)
    })
}

function newMessage(message, cb) {
    message.read = false
    db.contact.insert(message, (err, docs) => {
        if (err) {
            return cb(err)
        } else {
            return cb(null)
        }
    })
}

module.exports = {
    new: newMessage,
    read: markRead,
    get: getMessages
}
const mongo = require('mongojs')
const db = mongo('rm', ['contact'])
const {exec} = require('child_process')

function addContact(obj, cb) {
    let mailBody = `<html><head></head><body><span>name: ${obj.name}</span><br/><span>reason: ${obj.reason}<span><span>company: ${obj.company || "N/A"}</span><br/><span>roll: ${obj.roll | "N/A"}</span><br/><span>content: ${obj.content}</span><br/></body></html>`
    let command = `echo ${mailBody} | mail -s "rm.p contact form r.f.masen@gmail.com`
    exec(command, (err, stdOut, stdErr) => {
        if (err) console.log(err.message)
        if (stdOut) console.log(stdOut)
        if (stdErr) console.log(stdErr)
    })
    db.contact.insert(obj, (err) => {
        if (err) {
            cb(err)
        } else {
            cb(null)
        }
    })
}

module.exports = addContact
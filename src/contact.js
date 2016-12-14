const mongo = require('mongojs')
const db = mongo('rm', ['contact'])
const {exec} = require('child_process')

function addContact(obj, cb) {
    let mailBody = `name: ${obj.name}
                    reason: ${obj.reason}
                    company: ${obj.company || "N/A"}
                    roll: ${obj.roll | "N/A"}
                    content: ${obj.content}`
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
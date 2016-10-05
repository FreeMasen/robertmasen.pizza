var fs = require('fs')

fs.readFile('../server/jobs.json', 'utf8', (err, jobsdata) => {
    if (err) throw err
    fs.readFile('../server/nonJobs.json', 'utf8', (err, nonjobsdata) => {
        if (err) throw err
        console.log(jobsdata)
        var jobs = JSON.parse(jobsdata)
        var nonJobs = JSON.parse(nonjobsdata)
        addCollectionName('jobs', jobs)
        addCollectionName('nonjobs', nonjobsdata)
    })
})

function addCollectionName(name, arr) {
    for (i=0;i<arr.length;i++) {
        arr[i].collection = name
    }
    fs.writeFile('../server/' + name + '.json', JSON.stringify(arr), (err) => {

    })
}
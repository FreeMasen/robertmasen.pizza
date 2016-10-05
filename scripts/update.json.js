var fs = require('fs')

fs.readFile('nonJobs.json', 'utf8', (err, data) => {
    if (err) throw err
            var nonJobs = JSON.parse(data)
        addCollectionName('nonjobs', nonJobs)
})

function addCollectionName(name, arr) {
    for (i=0;i<arr.length;i++) {
        arr[i].collection = name
    }
    fs.writeFile( name + '.json', JSON.stringify(arr), (err) => {

    })
}
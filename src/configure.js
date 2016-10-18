const express = require('express')
const app = express()
app.use(express.static('www', {etag: true, maxAge: 86400}))

const morgan = require('morgan')
app.use(morgan('dev'))

const compression = require('compression')
app.use(compression({level: 9}))

const bodyparser = require('body-parser')
app.use(bodyparser.json())

module.exports = app
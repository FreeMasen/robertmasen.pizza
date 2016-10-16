const express = require('express')
const app = express()
app.use(express.static('www'))

const morgan = require('morgan')
app.use(morgan('dev'))

const compression = require('compression')
app.use(compression({level: 9}))

const bodyparser = require('body-parser')
app.use(bodyparser.json())

const minify = require('express-minify')
app.use(minify())

module.exports = app
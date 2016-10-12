const express = require('express')
const app = express()
app.use(express.static('www'))

const morgan = require('morgan')
app.use(morgan('dev'))

const compression = require('compression')
app.use(compression())

const bodyparser = require('body-parser')
app.use(bodyparser.json())

module.exports = app
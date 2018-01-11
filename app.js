const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

require('./database-connection')

const app = express()

app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(cookieParser())
app.set('view engine', 'pug')

const theater = require('./routes/theater')

app.use('/theater', theater)

app.get('/', async (req, res, next) => {
  res.render('index')
})

module.exports = app

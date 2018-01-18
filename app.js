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
app.use(logErrors)
app.use(databaseErrorHandler)
app.use(validationErrorHandler)
app.use(errorHandler)

app.get('/', async (req, res, next) => {
  res.render('index')
})

//Express Error Handlers
function logErrors(err, req, res, next) {
  console.error(`Error: ${err.name}`)
  next(err)
}

function databaseErrorHandler(err, req, res, next) {
  if (err.name === 'MongoError' && err.code === 11000) {
    return res.status(409).send({
      message: 'This email has already been registered 😭. Please try another.'
    })
  } else {
    next(err)
  }
}

function validationErrorHandler(err, req, res, next) {
  if (err.name === 'ValidationError') {
    return res.status(422).send({ message: err.message })
  } else {
    next(err)
  }
}

function errorHandler(err, req, res, next) {
  return res.status(500).send({
    message: `I'm sorry, there was an error. Try again. 👻`
  })
}

module.exports = app

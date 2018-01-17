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
app.use(handleError)

app.get('/', async (req, res, next) => {
  res.render('index')
})

//Express Error Handlers
function handleError(err, req, res, next) {
  console.error(`Error: ${err.message}`)
  next(err)
}

function handleDatabaseError(err, req, res, next) {
  if (err.name === MongoError && err.code === 11000) {
    return res.status(500).send({
      message: 'Duplicated entry.'
    })
  }
}

module.exports = app

// console.log('Error: ' + err.message)
//     return res.status(500).send({ type: 'MongoError', message: err.message })

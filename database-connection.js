const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/cinema-theater-db', {
  useMongoClient: true
})

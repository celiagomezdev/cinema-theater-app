const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/cinema-theater-db', {
  useMongoClient: true
})

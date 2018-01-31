const mongoose = require('mongoose')
const config = require('config')

mongoose.Promise = global.Promise

mongoose.connect(config.get('mongoProdUrl'), {
  useMongoClient: true
})

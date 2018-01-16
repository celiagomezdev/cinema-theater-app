const mongoose = require('mongoose')
const config = require('config')

const CustomerModel = require('../models/customer-model')
const SeatModel = require('../models/seat-model')

mongoose.Promise = global.Promise

mongoose.connect(config.get('mongoTestUrl'), {
  useMongoClient: true
})

function removeAll() {
  CustomerModel.remove({}, function(err, result) {
    if (err) return err
    console.log(result)
  })
  SeatModel.remove({}, function(err, result) {
    if (err) return err
    console.log(result)
  })
}

module.exports = {
  removeAll
}

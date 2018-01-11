const mongoose = require('mongoose')

const CustomerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  funds: {
    type: Number,
    default: 0
  },
  seat: {
    type: mongoose.Schema.Types.ObjectId,
    default: {}
  }
})

const CustomerModel = mongoose.model('Customer', CustomerSchema)

module.exports = CustomerModel

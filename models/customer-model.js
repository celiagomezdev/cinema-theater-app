const mongoose = require('mongoose')

const CustomerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  funds: {
    type: Number,
    default: 0
  },
  seatId: {
    type: Number,
    default: 0
  }
})

const CustomerModel = mongoose.model('Customer', CustomerSchema)

module.exports = CustomerModel

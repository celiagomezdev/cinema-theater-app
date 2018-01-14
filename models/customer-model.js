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
    default: 20
  },
  seats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seat'
    }
  ]
})

const CustomerModel = mongoose.model('Customer', CustomerSchema)

module.exports = CustomerModel

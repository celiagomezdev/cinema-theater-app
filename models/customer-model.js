const mongoose = require('mongoose')
const validate = require('mongoose-validator')

const emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Invalid Email address. Please try again'
  })
]

const CustomerSchema = mongoose.Schema({
  name: {
    type: String,
    min: [3, 'The name should have at least 3 characters.'],
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: emailValidator
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

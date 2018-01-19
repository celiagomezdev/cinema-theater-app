const mongoose = require('mongoose')
const validate = require('mongoose-validator')

const emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Invalid Email address. Please try again'
  })
]

const CustomerSchema = mongoose.Schema({
  firstName: {
    type: String,
    min: [2, 'The First Name field should have at least 2 characters.'],
    required: true
  },
  lastName: {
    type: String,
    min: [2, 'The Last Name field should have at least 2 characters.'],
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

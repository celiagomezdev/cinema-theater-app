const mongoose = require('mongoose')

const SeatSchema = mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
  row: {
    type: Number,
    required: true
  },
  movie: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  available: {
    type: Boolean,
    default: true,

    required: true
  },
  customerId: {
    type: String,
    default: '',
    unique: true
  }
})

const SeatModel = mongoose.model('Seat', SeatSchema)

module.exports = SeatModel

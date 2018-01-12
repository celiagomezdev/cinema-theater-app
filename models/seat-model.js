const mongoose = require('mongoose')

const SeatSchema = mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true
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
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  }
})

const SeatModel = mongoose.model('Seat', SeatSchema)

module.exports = SeatModel

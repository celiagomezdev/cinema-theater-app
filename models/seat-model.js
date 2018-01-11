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
    type: Bool,
    default: true,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    default: {}
  }
})

const SeatModel = mongoose.model('Seat', SeatSchema)

module.exports = SeatModel

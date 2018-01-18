const mongoose = require('mongoose')
const validate = require('mongoose-validator')

const SeatSchema = mongoose.Schema({
  number: {
    type: Number,
    enum: [1 - 10],
    required: true
  },
  row: {
    type: Number,
    enum: [1 - 20],
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

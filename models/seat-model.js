const mongoose = require('mongoose')

const SeatSchema = mongoose.Schema({
  number: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
    unique: false
  },
  row: {
    type: Number,
    min: 1,
    max: 20,
    required: true,
    unique: false
  },
  movie: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  }
})

SeatSchema.index({ number: 1, row: 1 }, { unique: true })

const SeatModel = mongoose.model('Seat', SeatSchema)

module.exports = SeatModel

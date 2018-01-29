const mongoose = require('mongoose')

const SeatSchema = mongoose.Schema({
  roomId: {
    type: Number,
    required: true
  },
  row: {
    type: Number,
    min: 1,
    max: 20,
    required: true,
    unique: false
  },
  number: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
    unique: false
  },
  price: {
    type: Number,
    required: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  }
})

SeatSchema.index({ number: 1, row: 1 }, { unique: true })

const SeatModel = mongoose.model('Seat', SeatSchema)

module.exports = SeatModel

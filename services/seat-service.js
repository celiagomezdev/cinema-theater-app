const SeatModel = require('../models/seat-model')

function findAll() {
  return SeatModel.find()
}

async function add(seat) {
  return SeatModel.create(seat)
}

async function find(id) {
  return SeatModel.findOne({ _id: id }).populate('customer')
}

async function findAvailableSeats() {
  return SeatModel.find({ available: true })
}

module.exports = {
  findAll,
  find,
  findAvailableSeats,
  add
}

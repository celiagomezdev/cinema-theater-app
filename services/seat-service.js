const SeatModel = require('../models/seat-model')

function findAll() {
  return SeatModel.find()
}

async function add(seat) {
  return SeatModel.create(seat)
}

async function find(id) {
  return await SeatModel.findOne({ _id: id })
}

async function findAvailableSeats() {
  return SeatModel.find({ customerId: undefined })
}

async function findSeatBookedBy(id) {
  return SeatModel.findOne({ customerId: id })
}

module.exports = {
  findAll,
  find,
  findAvailableSeats,
  add,
  findSeatBookedBy
}

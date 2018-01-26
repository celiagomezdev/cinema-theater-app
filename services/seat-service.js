const SeatModel = require('../models/seat-model')

function findAll() {
  return SeatModel.find()
}

async function add(seat) {
  return SeatModel.create(seat)
}

async function find(id) {
  const foundSeat = await SeatModel.findOne({ _id: id }).populate('customer')
  console.log(`Seat found in the database with id '${id}': ${foundSeat}`)
  return foundSeat
}

async function findAvailableSeats() {
  return SeatModel.find({ customer: undefined })
}

async function findSeatBookedBy(id) {
  return SeatModel.findOne({ customer: id })
}

module.exports = {
  findAll,
  find,
  findAvailableSeats,
  add,
  findSeatBookedBy
}

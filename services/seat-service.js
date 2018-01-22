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
  return SeatModel.find({ customer: undefined })
}

//Helper methods

async function findSeatBookedBy(id) {
  return SeatModel.findOne({ customer: id })
}

async function checkSeatStatus(customer) {
  const seatBookedBy = await findSeatBookedBy(customer._id)
  if (seatBookedBy != undefined || seatBookedBy != null) {
    return res.status(409).send({
      message: 'This customer already has a ticket.'
    })
  }
}

async function checkCustomerStatus(seat) {
  if (seat.customer != undefined || seat.customer != null) {
    return res.status(409).send({
      message: 'This seat is not available.'
    })
  }
}

module.exports = {
  findAll,
  find,
  findAvailableSeats,
  add,
  checkSeatStatus,
  checkCustomerStatus
}

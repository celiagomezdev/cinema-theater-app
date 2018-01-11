const SeatModel = require('../models/seat-model')

function findAll() {
  return SeatModel.find()
}

async function add(seat) {
  return SeatModel.create(seat)
}

async function find(id) {
  return SeatModel.findOne({ _id: id })
}

module.exports = {
  findAll,
  find,
  add
}

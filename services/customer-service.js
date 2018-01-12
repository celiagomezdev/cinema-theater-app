const CustomerModel = require('../models/customer-model')

function findAll() {
  return CustomerModel.find()
}

async function add(customer) {
  return CustomerModel.create(customer)
}

async function find(id) {
  return CustomerModel.findOne({ _id: id }).populate('seat')
}

module.exports = {
  findAll,
  find,
  add
}

const CustomerModel = require('../models/customer-model')

function findAll() {
  return CustomerModel.find()
}

async function add(customer) {
  return CustomerModel.create(customer)
}

module.exports = {
  findAll,
  add
}

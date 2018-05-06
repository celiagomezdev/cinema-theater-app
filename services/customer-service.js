const CustomerModel = require('../models/customer-model')

function findAll() {
  return CustomerModel.find()
}

async function add(customer) {
  return CustomerModel.create(customer)
}

async function find(id) {
  return CustomerModel.findOne({ _id: id })
}

async function findByIdAndUpdate(id) {
  return CustomerModel.findByIdAndUpdate({ _id: id })
}

async function del(id) {
  return CustomerModel.remove({ _id: id })
}

module.exports = {
  findAll,
  find,
  add,
  findByIdAndUpdate
}

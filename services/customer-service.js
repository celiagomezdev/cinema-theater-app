const CustomerModel = require('../models/customer-model')

function findAll() {
  return CustomerModel.find()
}

async function add(customer) {
  return CustomerModel.create(customer)
}

async function find(id) {
  const foundCustomer = await CustomerModel.findOne({ _id: id })
  console.log(
    `Customer found in the database with id '${id}': ${foundCustomer}`
  )
  return foundCustomer
}

async function del(id) {
  return CustomerModel.remove({ _id: id })
}

module.exports = {
  findAll,
  find,
  add
}

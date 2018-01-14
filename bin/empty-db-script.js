const CustomerModel = require('../models/customer-model')
const SeatModel = require('../models/seat-model')

function removeAll() {
  CustomerModel.remove({})
  SeatModel.remove({})
}

module.exports = {
  removeAll
}

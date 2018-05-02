const CustomerModel = require('../models/customer-model')
const SeatModel = require('../models/seat-model')

require('../database-connection')

function emptyCustomerDb() {
  CustomerModel.remove({}, function(err, result) {
    if (err) return err
    console.log(
      'Customers collection removed: ' + JSON.stringify(result.result)
    )
  })
}

function emptySeatDb() {
  SeatModel.remove({}, function(err, result) {
    if (err) return err
    console.log('Seats collection removed: ' + JSON.stringify(result.result))
  })
}

module.exports = {
  emptyCustomerDb,
  emptySeatDb
}

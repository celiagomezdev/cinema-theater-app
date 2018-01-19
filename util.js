const CustomerModel = require('./models/customer-model')
const SeatModel = require('./models/seat-model')

require('./database-connection')

function emptyDb() {
  CustomerModel.remove({}, function(err, result) {
    if (err) return err
    console.log(
      'Customers collection removed: ' + JSON.stringify(result.result)
    )
  })
  SeatModel.remove({}, function(err, result) {
    if (err) return err
    console.log('Seats collection removed: ' + JSON.stringify(result.result))
  })
}

module.exports = {
  emptyDb
}

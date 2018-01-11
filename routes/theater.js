const express = require('express')
const router = express.Router()

const CustomerService = require('../services/customer-service')
const SeatService = require('../services/seat-service')

//Customer routes

router.get('/customer', async (req, res, next) => {
  res.send(await CustomerService.findAll())
})

router.post('/customer', async (req, res, next) => {
  const newCustomer = req.body
  try {
    const customer = await CustomerService.add(newCustomer)
    res.send(customer)
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      console.log('duplication error')
      return res.status(500).send({
        success: false,
        message: 'A customer with this email is already registered.'
      })
    }
    console.log(err.message)
    return res.status(500).send({ success: false, message: err.message })
  }
})

module.exports = router

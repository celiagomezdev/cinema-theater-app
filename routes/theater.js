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
      return res.status(500).send({
        success: false,
        message: 'An user with this email is already registered.'
      })
    }
    console.log(err)
    return res.status(500).send({ success: false, message: err.message })
  }
})

//Seat routes

router.get('/seat', async (req, res, next) => {
  res.send(await SeatService.findAll())
})

router.post('/seat', async (req, res, next) => {
  const newSeat = req.body
  try {
    const seat = await SeatService.add(newSeat)
    res.send(seat)
  } catch (err) {
    console.log(err.message)
    if (err.name === 'MongoError' && err.code === 11000) {
      return res.status(500).send({
        success: false,
        message: 'This seat is already registered.'
      })
    }
    console.log(err)
    return res.status(500).send({ success: false, message: err.message })
  }
})

module.exports = router

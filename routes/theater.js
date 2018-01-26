const express = require('express')
const router = express.Router()

const CustomerService = require('../services/customer-service')
const SeatService = require('../services/seat-service')

//Customer routes

router.get('/customer', async (req, res, next) => {
  res.send(await CustomerService.findAll())
})

router.get('/customer/detail/:id', async (req, res, next) => {
  const customer = await CustomerService.find(req.params.id)
  res.render('customer-detail', { customer })
})

router.get('/customer/all', async (req, res, next) => {
  const customers = await CustomerService.findAll()
  res.render('customer-list', { customers })
})

router.post('/customer', async (req, res, next) => {
  const newCustomer = req.body
  try {
    const customer = await CustomerService.add(newCustomer)
    res.send(customer)
  } catch (err) {
    return next(err)
  }
})

router.post('/booking', async (req, res, next) => {
  console.log(`Received userId in routes: ${req.body.userId}`)
  console.log(`Received seatId in routes: ${req.body.seatId}`)
  const customer = await CustomerService.find(req.body.userId)
  const seat = await SeatService.find(req.body.seatId)

  if (await hasSeat(customer)) {
    return res.status(409).send({
      message: 'This customer already has a booked seat.'
    })
  }

  if (await isBooked(seat)) {
    return res.status(409).send({
      message: 'This seat is not available.'
    })
  }

  if (seatExists(seat) === false) {
    return res.status(409).send({
      message: `This seat doesn't exists.`
    })
  }

  try {
    seat.customer = customer._id
    const updatedSeat = await seat.save()
    return res.send(updatedSeat)
  } catch (err) {
    return next(err)
  }
})

//Seat routes

router.get('/seat', async (req, res, next) => {
  res.send(await SeatService.findAll())
})

router.get('/seat/detail/:id', async (req, res, next) => {
  const seat = await SeatService.find(req.params.id)
  res.render('seat-detail', { seat })
})

router.get('/seat/detail/:id/json', async (req, res, next) => {
  try {
    const seat = await SeatService.find(req.params.id)
    res.send(seat)
  } catch (err) {
    return next(err)
  }
})

router.get('/seat/all', async (req, res, next) => {
  const seats = await SeatService.findAll()
  res.render('seat-list', { seats })
})

router.get('/seat/available', async (req, res, next) => {
  const seats = await SeatService.findAvailableSeats()
  res.render('seat-list', { seats })
})

router.post('/seat', async (req, res, next) => {
  const newSeat = req.body
  try {
    const seat = await SeatService.add(newSeat)
    res.send(seat)
  } catch (err) {
    next(err)
  }
})

//Helper methods

async function hasSeat(customer) {
  const seatBookedBy = await SeatService.findSeatBookedBy(customer._id)
  if (seatBookedBy != undefined || seatBookedBy != null) {
    return true
  }
}

function isBooked(seat) {
  const seatCustomer = seat.customer
  if (seatCustomer != undefined || seatCustomer != null) {
    return true
  }
}

async function seatExists(seat) {
  if (seat != undefined || seat != null) {
    return true
  }
}

module.exports = router

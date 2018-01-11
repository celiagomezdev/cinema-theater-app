const express = require('express')
const router = express.Router()

const CustomerService = require('../services/customer-service')
const SeatService = require('../services/seat-service')

// router.get('/', async (req, res, next) => {
//   res.send(await TheaterService.findAll)
// })

module.exports = router

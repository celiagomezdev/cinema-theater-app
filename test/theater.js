import test from 'ava'
import request from 'supertest'
import app from '../app'
import faker from 'faker'
import mongoose from 'mongoose'
import databaseHelper from '../bin/empty-db'

//Helpers

databaseHelper.emptySeatDb()
databaseHelper.emptyCustomerDb()

//Customer tests

test('Get a list of customers', async t => {
  const customer = {
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    email: faker.internet.email()
  }

  const creation = await request(app)
    .post('/theater/customer')
    .send(customer)

  const res = await request(app).get('/theater/customer')

  t.is(res.status, 200)
  t.true(Array.isArray(res.body), 'Body should be an array')
  t.true(res.body.length > 0)
})

test('Create a new customer', async t => {
  const customer = {
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    email: faker.internet.email()
  }

  const res = await request(app)
    .post('/theater/customer')
    .send(customer)

  t.is(res.status, 200)
  t.is(res.body.name, customer.name)
  t.is(res.body.email, customer.email)
})

test('Attempt to create a new customer with an empty field', async t => {
  const customer = {
    firstName: '',
    lastName: faker.name.findName(),
    email: ''
  }

  const res = await request(app)
    .post('/theater/customer')
    .send(customer)

  t.is(res.status, 400)
})

test('Attempt to create a new customer with an invalid field', async t => {
  const customer = {
    firstName: 'Paquita',
    lastName: 'Salas',
    email: 'hola@'
  }

  const res = await request(app)
    .post('/theater/customer')
    .send(customer)

  t.is(res.status, 400)
})

test('Attempt to create duplicated customers', async t => {
  const customer = {
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    email: 'hjgk@hotmail.com'
  }

  const res = await request(app)
    .post('/theater/customer')
    .send(customer)

  const dupCustomer = {
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    email: 'hjgk@hotmail.com'
  }

  const dupRes = await request(app)
    .post('/theater/customer')
    .send(dupCustomer)

  t.is(dupRes.status, 409)
})

// Seat tests

test('Get a list of seats', async t => {
  const seat = {
    row: 10,
    number: 1,
    movieTitle: 'Arrival',
    price: 7
  }

  const creation = await request(app)
    .post('/theater/seat')
    .send(seat)

  const res = await request(app).get('/theater/seat')

  t.is(res.status, 200)
  t.true(Array.isArray(res.body), 'Body should be an array')
  t.true(res.body.length > 0)
})

test('Create a new seat', async t => {
  const seat = {
    row: 8,
    number: 7,
    movieTitle: 'Arrival',
    price: 7
  }

  const res = await request(app)
    .post('/theater/seat')
    .send(seat)

  t.is(res.status, 200)
  t.is(res.body.number, seat.number)
  t.is(res.body.row, seat.row)
  t.is(res.body.movie, seat.movie)
})

test('Fetch a seat', async t => {
  t.plan(2)

  const seat = (await request(app)
    .post('/theater/seat')
    .send({
      row: 2,
      number: 6,
      movieTitle: 'Arrival',
      price: 8
    })).body

  const fetch = await request(app).get(`/theater/seat/detail/${seat._id}/json`)

  t.is(fetch.status, 200)
  t.deepEqual(fetch.body, seat)
})

test('Attempt to create duplicated seats', async t => {
  const seat = {
    row: 2,
    number: 2,
    movieTitle: 'Arrival',
    price: 8
  }

  const res = await request(app)
    .post('/theater/seat')
    .send(seat)

  const dupSeat = {
    row: 2,
    number: 2,
    movieTitle: 'Arrival',
    price: 8
  }

  const dupRes = await request(app)
    .post('/theater/seat')
    .send(dupSeat)

  t.is(dupRes.status, 409)
})

// Reservation and Booking tests

test('Make a reservation', async t => {
  t.plan(3)

  const seat = {
    row: 4,
    number: 4,
    movieTitle: 'Arrival',
    price: 8
  }

  const seatRes = await request(app)
    .post('/theater/seat')
    .send(seat)

  t.is(seatRes.status, 200)

  const customer = {
    firstName: 'Laura',
    lastName: 'Pérez',
    email: faker.internet.email()
  }

  const customerRes = await request(app)
    .post('/theater/customer')
    .send(customer)

  t.is(customerRes.status, 200)

  const bodyReq = { userId: customerRes.body._id, seatId: seatRes.body._id }

  const reservationRes = await request(app)
    .post('/theater/reservation')
    .send(bodyReq)

  t.is(reservationRes.status, 200)
})

test('Attempt to reserve an already reserved seat', async t => {
  //Reserve first seat

  const seat = {
    row: 6,
    number: 5,
    movieTitle: 'Arrival',
    price: 8
  }

  const seatRes = await request(app)
    .post('/theater/seat')
    .send(seat)

  t.is(seatRes.status, 200)

  const firstCustomer = {
    firstName: 'Laura',
    lastName: 'Kasas',
    email: faker.internet.email()
  }

  const firstCustomerRes = await request(app)
    .post('/theater/customer')
    .send(firstCustomer)

  t.is(firstCustomerRes.status, 200)

  const bodyReq = {
    userId: firstCustomerRes.body._id,
    seatId: seatRes.body._id
  }

  const reservationRes = await request(app)
    .post(`/theater/reservation`)
    .send(bodyReq)

  t.is(reservationRes.status, 200)

  //Make second reservation

  const secondCustomer = {
    firstName: 'Ramona',
    lastName: 'López',
    email: faker.internet.email()
  }

  const secondCustomerRes = await request(app)
    .post('/theater/customer')
    .send(secondCustomer)

  t.is(secondCustomerRes.status, 200)

  const secondBodyReq = {
    userId: secondCustomerRes.body._id,
    seatId: seatRes.body._id
  }

  const secondReservationRes = await request(app)
    .post(`/theater/reservation`)
    .send(secondBodyReq)

  t.is(secondReservationRes.status, 409)
})

// Make a booking

test('Make a booking', async t => {
  t.plan(4)

  const seat = {
    row: 9,
    number: 7,
    movieTitle: 'Arrival',
    price: 8
  }

  const seatRes = await request(app)
    .post('/theater/seat')
    .send(seat)

  t.is(seatRes.status, 200)

  const customer = {
    firstName: 'Peter',
    lastName: 'Böhme',
    email: faker.internet.email()
  }

  const customerRes = await request(app)
    .post('/theater/customer')
    .send(customer)

  t.is(customerRes.status, 200)

  //Make a reservation first

  const reservationBodyReq = {
    userId: customerRes.body._id,
    seatId: seatRes.body._id
  }

  const reservationRes = await request(app)
    .post('/theater/reservation')
    .send(reservationBodyReq)

  t.is(reservationRes.status, 200)

  //Make the booking

  const bookingBodyReq = {
    userId: customerRes.body._id,
    seatId: seatRes.body._id
  }

  const bookingRes = await request(app)
    .post('/theater/booking')
    .send(bookingBodyReq)

  t.is(bookingRes.status, 200)
})

test('Attempt to book an already booked or reserved seat', async t => {
  t.plan(5)

  const seat = {
    row: 6,
    number: 2,
    movieTitle: 'Arrival',
    price: 8
  }

  const seatRes = await request(app)
    .post('/theater/seat')
    .send(seat)

  t.is(seatRes.status, 200)

  const customer = {
    firstName: 'Charles',
    lastName: 'Ros',
    email: faker.internet.email()
  }

  const customerRes = await request(app)
    .post('/theater/customer')
    .send(customer)

  t.is(customerRes.status, 200)

  //Another user reserves that seat

  const reservationBodyReq = {
    userId: customerRes.body._id,
    seatId: seatRes.body._id
  }

  const reservationRes = await request(app)
    .post('/theater/reservation')
    .send(reservationBodyReq)

  t.is(reservationRes.status, 200)

  //Next user makes a booking for the same seat

  const secondCustomer = {
    firstName: 'Ana',
    lastName: 'Riess',
    email: faker.internet.email()
  }

  const secondCustomerRes = await request(app)
    .post('/theater/customer')
    .send(secondCustomer)

  t.is(secondCustomerRes.status, 200)

  const bookingBodyReq = {
    userId: secondCustomerRes.body._id,
    seatId: seatRes.body._id
  }

  const bookingRes = await request(app)
    .post('/theater/booking')
    .send(bookingBodyReq)

  t.is(bookingRes.status, 409)
})

test('Attempt to book a seat without enough funds ', async t => {
  t.plan(4)

  const seat = {
    row: 9,
    number: 1,
    movieTitle: 'Arrival',
    price: 8
  }

  const seatRes = await request(app)
    .post('/theater/seat')
    .send(seat)

  t.is(seatRes.status, 200)

  const customer = {
    firstName: 'Karina',
    lastName: 'Karl',
    email: faker.internet.email(),
    funds: 6
  }

  const customerRes = await request(app)
    .post('/theater/customer')
    .send(customer)

  t.is(customerRes.status, 200)

  //Reserve first

  const reservationBodyReq = {
    userId: customerRes.body._id,
    seatId: seatRes.body._id
  }

  const reservationRes = await request(app)
    .post('/theater/reservation')
    .send(reservationBodyReq)

  t.is(reservationRes.status, 200)

  //Make the booking

  const bookingBodyReq = {
    userId: customerRes.body._id,
    seatId: seatRes.body._id
  }

  const bookingRes = await request(app)
    .post('/theater/booking')
    .send(bookingBodyReq)

  t.is(bookingRes.status, 412)
})

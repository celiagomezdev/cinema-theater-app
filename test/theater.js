import test from 'ava'
import request from 'supertest'
import app from '../app'
import faker from 'faker'
import mongoose from 'mongoose'
import emptyDbScript from '../bin/empty-db-script'

emptyDbScript.removeAll()

test('Get a list of customers', async t => {
  const customer = {
    name: faker.name.findName(),
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
    name: 'Marina Romero',
    email: faker.internet.email()
  }

  const res = await request(app)
    .post('/theater/customer')
    .send(customer)

  t.is(res.status, 200)
  t.is(res.body.name, customer.name)
  t.is(res.body.email, customer.email)
})

test('Avoid creating duplicated customers', async t => {
  const customer = {
    name: faker.name.findName(),
    email: 'hjgk@hotmail.com'
  }

  const res = await request(app)
    .post('/theater/customer')
    .send(customer)

  const dupCustomer = {
    name: faker.name.findName(),
    email: 'hjgk@hotmail.com'
  }

  const dupRes = await request(app)
    .post('/theater/customer')
    .send(dupCustomer)

  t.is(dupRes.status, 400)
})

//Seat tests

test('Get a list of seats', async t => {
  const seat = {
    number: faker.random.number(),
    row: faker.random.number(),
    movie: faker.random.word(),
    price: 8,
    available: false
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
    number: faker.random.number(),
    row: faker.random.number(),
    movie: faker.random.word(),
    price: 8,
    available: true
  }

  const res = await request(app)
    .post('/theater/seat')
    .send(seat)

  t.is(res.status, 200)
  t.is(res.body.number, seat.number)
  t.is(res.body.row, seat.row)
  t.is(res.body.movie, seat.movie)
})

test('Avoid creating duplicated seats', async t => {
  const seat = {
    number: 45,
    row: faker.random.number(),
    movie: faker.random.word(),
    price: 8,
    available: true
  }

  const res = await request(app)
    .post('/theater/seat')
    .send(seat)

  const dupSeat = {
    number: 45,
    row: faker.random.number(),
    movie: faker.random.word(),
    price: 8,
    available: true
  }

  const dupRes = await request(app)
    .post('/theater/seat')
    .send(dupSeat)

  t.is(dupRes.status, 400)
})

test('Make a booking', async t => {
  t.plan(3)

  const seat = {
    number: faker.random.number(),
    row: faker.random.number(),
    movie: faker.random.word(),
    price: 8,
    available: true
  }

  const seatRes = await request(app)
    .post('/theater/seat')
    .send(seat)

  t.is(seatRes.status, 200)

  const customer = {
    name: 'María Pérez',
    email: faker.internet.email()
  }

  const customerRes = await request(app)
    .post('/theater/customer')
    .send(customer)

  t.is(customerRes.status, 200)

  const customerId = customerRes.body._id
  const seatId = { seat: seatRes.body._id }
  console.log(customerId)
  console.log(seatId)

  const bookingRes = await request(app)
    .post(`/theater/customer/${customerId}/booking`)
    .send(seatId)

  t.is(bookingRes.status, 200)
})

test('Avoid making a booking if a ticket is reserved', async t => {
  t.plan(3)

  const seat = {
    number: 20,
    row: faker.random.number(),
    movie: 'La la land',
    price: 8,
    available: true,
    customer: new mongoose.Types.ObjectId('5962a5f37bde228394da6f72')
  }

  const seatRes = await request(app)
    .post('/theater/seat')
    .send(seat)

  t.is(seatRes.status, 200)

  const customer = {
    name: 'Ramona López',
    email: faker.internet.email()
  }

  const customerRes = await request(app)
    .post('/theater/customer')
    .send(customer)

  t.is(customerRes.status, 200)

  const customerId = customerRes.body._id
  const seatId = { seat: seatRes.body._id }

  console.log(seatId)

  const bookingRes = await request(app)
    .post(`/theater/customer/${customerId}/booking`)
    .send(seatId)

  t.is(bookingRes.status, 400)
})

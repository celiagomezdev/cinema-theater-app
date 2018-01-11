import test from 'ava'
import request from 'supertest'
import app from '../app'
import faker from 'faker'

test('Get a list of customers', async t => {
  const customer = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    funds: 50,
    seatId: 8
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
    name: faker.name.findName(),
    email: faker.internet.email(),
    funds: 50,
    seatId: faker.random.uuid()
  }

  const res = await request(app)
    .post('/theater/customer')
    .send(customer)

  t.is(res.status, 200)
  t.is(res.body.name, customer.name)
  t.is(res.body.email, customer.email)
  t.is(res.body.funds, customer.funds)
  t.is(res.body.seat, customer.seat)
})

test('Avoid creating duplicated customers', async t => {
  const customer = {
    name: faker.name.findName(),
    email: 'hjgk@hotmail.com',
    funds: 50,
    seatId: faker.random.uuid()
  }

  const res = await request(app)
    .post('/theater/customer')
    .send(customer)

  const dupCustomer = {
    name: faker.name.findName(),
    email: 'hjgk@hotmail.com',
    funds: 50,
    seatId: faker.random.uuid()
  }

  const dupRes = await request(app)
    .post('/theater/customer')
    .send(dupCustomer)

  t.is(dupRes.status, 500)
})

//Seat tests

test('Get a list of seats', async t => {
  const seat = {
    number: faker.random.number(),
    row: faker.random.number(),
    movie: faker.random.word(),
    price: 8,
    available: false,
    customerId: faker.random.uuid()
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
    available: true,
    customerId: faker.random.uuid()
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
    available: true,
    customerId: faker.random.uuid()
  }

  const res = await request(app)
    .post('/theater/seat')
    .send(seat)

  const dupSeat = {
    number: 45,
    row: faker.random.number(),
    movie: faker.random.word(),
    price: 8,
    available: true,
    customerId: faker.random.uuid()
  }

  const dupRes = await request(app)
    .post('/theater/seat')
    .send(dupSeat)

  t.is(dupRes.status, 500)
})

test('Make a booking', async t => {
  t.plan(3)

  const seat = {
    number: faker.random.number(),
    row: faker.random.number(),
    movie: faker.random.word(),
    price: 8,
    available: true,
    customerId: ''
  }

  const seatRes = await request(app)
    .post('/theater/seat')
    .send(seat)

  t.is(seatRes.status, 200)

  const customer = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    funds: 50,
    seatId: ''
  }

  const customerRes = await request(app)
    .post('/theater/customer')
    .send(customer)

  t.is(customerRes.status, 200)

  const customerId = customerRes.body._id
  const seatIdBodyReq = { seatId: seatRes.body._id }

  const bookingRes = await request(app)
    .post(`/theater/customer/${customerId}/booking`)
    .send(seatIdBodyReq)

  t.is(bookingRes.status, 200)
})

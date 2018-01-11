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
    seatId: 10
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

test('Create duplicated customer', async t => {
  const customer = {
    name: faker.name.findName(),
    email: 'hjgk@hotmail.com',
    funds: 50,
    seatId: 15
  }

  const res = await request(app)
    .post('/theater/customer')
    .send(customer)

  const dupCustomer = {
    name: faker.name.findName(),
    email: 'hjgk@hotmail.com',
    funds: 50,
    seatId: 32
  }

  const dupRes = await request(app)
    .post('/theater/customer')
    .send(dupCustomer)

  t.is(dupRes.status, 500)
})

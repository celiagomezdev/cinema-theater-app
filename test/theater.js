import test from 'ava'
import request from 'supertest'
import faker from 'faker'
import app from '../app'

test('Get a list of customers', async t => {
  const customer = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    funds: 50,
    seat: {}
  }

  const creation = await request(app)
    .post('/customer')
    .send(customer)

  const res = await request(app).get('/customer')

  t.is(res.status, 200)
  t.true(Array.isArray(res.body), 'Body should be an array')
  t.true(res.body.length > 0)
})

test('Create a new customer', async t => {
  const customer = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    funds: 50,
    seat: {}
  }

  const res = await request(app)
    .post('/customer')
    .send(bar)

  t.is(res.status, 200)
  t.is(res.body.name, customer.name)
  t.is(res.body.email, customer.email)
  t.is(res.body.funds, customer.funds)
  t.is(res.body.seat, customer.seat)
})

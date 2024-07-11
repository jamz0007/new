const request = require('supertest')
const app = require('../server')
const mongoose = require('mongoose')
const ExcuseModel = require('../models/excuse.model')


beforeAll(async () => {
  // delete all excuses
  await ExcuseModel.deleteMany({})
})

afterAll(async () => {
  // close the connection to the database
  await mongoose.connection.close()
  // close the server
  app.close()
})

test('#1 GET / - Without data return 202', async () => {
  const res = await request(app).get('/api/excuse')
  expect(res).toBeDefined()
  expect(res.statusCode).toBe(202)
  expect(res.body.message).toBe('no excuses available')
})

test('#2 POST / - With valid data return 201', async () => {
  const res = await request(app).post('/api/excuse').send({
    http_code: 500,
    tag: 'test',
    message: 'test'
  })
  expect(res).toBeDefined()
  expect(res.statusCode).toBe(201)
  expect(res.body.http_code).toBe(500)
  expect(res.body.tag).toBe('test')
  expect(res.body.message).toBe('test')
})

test('#3 POST / - Without data return 500', async () => {
  const res = await request(app).post('/api/excuse').send({})
  expect(res).toBeDefined()
  expect(res.statusCode).toBe(500)
})

test('#4 POST / - With existing http_code return 409', async () => {
  const res = await request(app).post('/api/excuse').send({
    http_code: 500,
    tag: 'test',
    message: 'test1'
  })
  expect(res).toBeDefined()
  expect(res.statusCode).toBe(409)
  expect(res.body.message).toBe('this http_code already exists')
})

test('#5 POST / - With existing message return 409', async () => {
  const res = await request(app).post('/api/excuse').send({
    http_code: 501,
    tag: 'test',
    message: 'test'
  })
  expect(res).toBeDefined()
  expect(res.statusCode).toBe(409)
  expect(res.body.message).toBe('this message already exists')
})

test('#6 GET / - With data return 200', async () => {
  const res = await request(app).get('/api/excuse')
  expect(res).toBeDefined()
  expect(res.statusCode).toBe(200)
  expect(res.body.length).toBe(1)
  expect(res.body[0].http_code).toBe(500)
  expect(res.body[0].tag).toBe('test')
  expect(res.body[0].message).toBe('test')
})

test('#7 GET / return 500', async () => {
  // close the connection to the database
  await mongoose.connection.close()
  const res = await request(app).get('/api/excuse')
  expect(res).toBeDefined()
  expect(res.statusCode).toBe(500)
})


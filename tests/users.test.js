const {app} = require('../app')
const request = require('supertest')
jest.mock('../services/users')
const userService = require('../services/users')

test('testing read', done => {
    userService.read.mockImplementation(()=> Promise.resolve({test:'1'}));
  request(app)
      .get('/user/John')
      .then(response => {
          expect(response.body).toEqual({'test':'1'})
          done()
      })
})
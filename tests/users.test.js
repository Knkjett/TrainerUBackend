// const {app} = require('../app')
// const request = require('supertest')
jest.mock('../services/dbConnect')
const {
  db
} = require('../services/dbConnect')
const userService = require('../services/users')

test('User POST Request', done => {
  db.none.mockImplementation((...rest) => Promise.resolve())
  userService.create('test@email.com', 'sptoken')
    .then(() => {
      expect(db.none.mock.calls[0][0]).toBe('INSERT INTO users (email,token) VALUES (${email}, ${token});');
      expect(db.none.mock.calls[0][1]).toEqual({
        'email': 'test@email.com',
        'token': 'sptoken'
      });
      done()
    })
})
test('User GET Request', done => {
  db.one.mockImplementation((...rest) => Promise.resolve())
  userService.read(1)
    .then(() => {
      expect(db.one.mock.calls[0][0]).toBe('SELECT email from users WHERE id=${id}');
      done()
    })
})
test('User UPDATE Request', done => {
  db.none.mockImplementation((...rest) => Promise.resolve())
  userService.update(1, 'notatest@email.com', 'notsp')
    .then(() => {
      expect(db.none.mock.calls[1][0]).toBe('UPDATE users SET email = ${email}, token = ${token} WHERE id=${id}')
      expect(db.none.mock.calls[1][1]).toEqual({
        'id': 1,
        'email': 'notatest@email.com',
        'token': 'notsp'
      });
      done()
    })
})
// test('User DELETE Request', done => {
//   db.none.mockImplementation((...rest) => Promise.resolve())
//   userService.delete(1)
//     .then(() => {
//       expect(db.none.mock.calls[2][0]).toBe('DELETE FROM users WHERE id=${id}')
//       expect(db.none.mock.calls[2][1]).toEqual({
//         'id': 1
//       });
//       done()
//     })
// })
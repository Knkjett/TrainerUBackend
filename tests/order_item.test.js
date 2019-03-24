// const {app} = require('../app')
// const request = require('supertest')
jest.mock('../services/dbConnect')
const {
  db
} = require('../services/dbConnect')
const orderItemService = require('../services/order_item')

test('OrderItem POST Request', done => {
  db.none.mockImplementation((...rest) => Promise.resolve())
  orderItemService.create(1, 2, 3, 3)
    .then(() => {
      expect(db.none.mock.calls[0][0]).toBe('INSERT INTO order_item (shop_id, order_id, product_id, amount) VALUES (${shop_id}, ${order_id}, ${product_id}, ${amount});');
      expect(db.none.mock.calls[0][1]).toEqual({
        'shop_id': 1,
        'order_id': 2,
        'product_id': 3,
        'amount':3
      });
      done()
    })
})
test('OrderItem GET Request', done => {
  db.one.mockImplementation((...rest) => Promise.resolve())
  orderItemService.read(1)
    .then(() => {
      expect(db.one.mock.calls[0][0]).toBe('SELECT * from order_item WHERE id=${id};');
      done()
    })
})
test('OrderItem UPDATE Request', done => {
  db.none.mockImplementation((...rest) => Promise.resolve())
  orderItemService.update(1,1,2,3,4)
     .then(() => {
      expect(db.none.mock.calls[1][0]).toBe('UPDATE order_item SET amount = ${amount} WHERE id=${id};')
      expect(db.none.mock.calls[1][1]).toEqual({
        'id':1,
        'shop_id': 1,
        'order_id': 2,
        'product_id': 3,
        'amount':4
      });
      done()
    })
})
// test('Products DELETE Request', done => {
//   db.none.mockImplementation((...rest) => Promise.resolve())
//   orderItemService.delete(1)
//     .then(() => {
//       expect(db.none.mock.calls[2][0]).toBe('DELETE FROM users WHERE id=${id}')
//       expect(db.none.mock.calls[2][1]).toEqual({
//         'id': 1
//       });
//       done()
//     })
// })
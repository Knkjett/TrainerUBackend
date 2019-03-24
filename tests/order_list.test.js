// const {app} = require('../app')
// const request = require('supertest')
jest.mock('../services/dbConnect')
const {
  db
} = require('../services/dbConnect')
const orderListService = require('../services/order_list')

test('OrderList POST Request', done => {
  db.none.mockImplementation((...rest) => Promise.resolve())
  orderListService.create(1,'fake street','5th fl','Old City','11111',42.99,'tk')
    .then(() => {
      expect(db.none.mock.calls[0][0]).toBe('INSERT INTO orderlist (user_id, address, address2, city, zipcode, total_amount, payment_token) VALUES (${user_id}, ${address}, ${address2}, ${city}, ${zipcode}, ${total_amount}, ${payment_token});');
      expect(db.none.mock.calls[0][1]).toEqual({
        'user_id': 1,
        'address': 'fake street',
        'address2': '5th fl',
        'city':'Old City',
        'zipcode':'11111',
        'total_amount':42.99,
        'payment_token':'tk',
      });
      done()
    })
})
test('OrderList GET Request', done => {
  db.one.mockImplementation((...rest) => Promise.resolve())
  orderListService.read(1)
    .then(() => {
      expect(db.one.mock.calls[0][0]).toBe('SELECT * from orderlist WHERE id=${id};');
      done()
    })
})
test('OrderList UPDATE Request', done => {
  db.none.mockImplementation((...rest) => Promise.resolve())
  orderListService.update(1,1,'fakest street','5th fl','Old City','11112',50,'tk2')
  .then(() => {
      expect(db.none.mock.calls[1][0]).toBe('UPDATE orderlist SET user_id=${user_id},address=${address},address2=${address2},city=${city},zipcode=${zipcode},total_amount=${total_amount}, payment_token=${payment_token} WHERE id=${id};')
      expect(db.none.mock.calls[1][1]).toEqual({
        'id': 1,
        'user_id':1,
        'address': 'fakest street',
        'address2': '5th fl',
        'city':'Old City',
        'zipcode':'11112',
        'total_amount':50,
        'payment_token':'tk2',
      });
      done()
    })
})
test('Shop get PRODUCTS Request', done => {
  db.any.mockImplementation((...rest) => Promise.resolve())
  orderListService.readItems(1)
    .then(() => {
      expect(db.any.mock.calls[0][0]).toBe('SELECT products.*, order_item.amount FROM order_item JOIN orderlist ON order_id= 1 JOIN products ON product_id = order_item.product_id WHERE (order_id = 1 AND products.id = order_item.id);')
      expect(db.any.mock.calls[0][1]).toEqual({
        'id': 1
      });
      done()
    })
})
// test('OrderList DELETE Request', done => {
//   db.none.mockImplementation((...rest) => Promise.resolve())
//   orderListService.delete(1)
//     .then(() => {
//       expect(db.none.mock.calls[2][0]).toBe('DELETE FROM users WHERE id=${id}')
//       expect(db.none.mock.calls[2][1]).toEqual({
//         'id': 1
//       });
//       done()
//     })
// })
const request = require('supertest');
const {app} = require('../app');
test('connecting to OrderList POST',done => {
  request(app)
  .post('/orders/')
  .then((res)=>{
    expect(res.status).toBe(201);
    done();
  })
})
test('connecting to OrderList GET',done => {
  request(app)
  .get('/orders/1')
  .then((res)=>{
    expect(res.status).toBe(200);
    done();
  })
})
test('connecting to OrderList PUT',done => {
  request(app)
  .put('/orders/1')
  .then((res)=>{
    expect(res.status).toBe(201);
    done();
  })
})
test('connecting to OrderList GET items',done => {
  request(app)
  .get('/orders/1/items')
  .then((res)=>{
    expect(res.status).toBe(200);
    done();
  })
})
//===REJECT===
test('connecting to OrderList POST Request', done => {
  db.none.mockImplementation((...rest) => Promise.reject())
  request(app)
  .post('/orders/')
    .then((res) => {
      expect(res.status).toBe(400);
    done();
    })
})
test('connecting to OrderList GET Request', done => {
  db.one.mockImplementation((...rest) => Promise.reject())
  request(app)
  .get('/orders/1')
    .then((res) => {
      expect(res.status).toBe(400);
    done();
    })
})
test('connecting to OrderList PUT Request', done => {
  db.none.mockImplementation((...rest) => Promise.reject())
  request(app)
  .put('/orders/1')
    .then((res) => {
      expect(res.status).toBe(400);
    done();
    })
})
test('connecting to OrderList GET Request Items', done => {
  db.any.mockImplementation((...rest) => Promise.reject())
  request(app)
  .get('/orders/1/items')
    .then((res) => {
      expect(res.status).toBe(400);
    done();
    })
})
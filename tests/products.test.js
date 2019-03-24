// const {app} = require('../app')
// const request = require('supertest')
jest.mock('../services/dbConnect')
const {
  db
} = require('../services/dbConnect')
const productsService = require('../services/products')

test('Products POST Request', done => {
  db.none.mockImplementation((...rest) => Promise.resolve())
  productsService.create(1, 'notBrandedShoes', 'cool product',10.50,'wearable',['a','b'],'9.5','mens')
    .then(() => {
      expect(db.none.mock.calls[0][0]).toBe('INSERT INTO products (shop_id, name, description, price, type, image_url_array, item_size, gender) VALUES (${shop_id}, ${name}, ${description}, ${price}, ${type}, ${image_url_array}, ${item_size}, ${gender});');
      expect(db.none.mock.calls[0][1]).toEqual({
        'shop_id': 1,
        'name': 'notBrandedShoes',
        'description': 'cool product',
        'price':10.50,
        'type':'wearable',
        'image_url_array':['a','b'],
        'item_size':'9.5',
        'gender':'mens'
      });
      done()
    })
})
test('Products GET Request', done => {
  db.one.mockImplementation((...rest) => Promise.resolve())
  productsService.read(1)
    .then(() => {
      expect(db.one.mock.calls[0][0]).toBe('SELECT * from products WHERE id=${id}');
      done()
    })
})
test('Products UPDATE Request', done => {
  db.none.mockImplementation((...rest) => Promise.resolve())
  productsService.update(1, 'BrandedShoes', 'cooler product',21.50,'wearable',['a','b','c'],'9.5','mens')
     .then(() => {
      expect(db.none.mock.calls[1][0]).toBe('UPDATE products SET name = ${name}, description=${description}, price=${price}, type=${type},image_url_array=${image_url_array},item_size=${item_size},gender=${gender} WHERE id=${id}')
      expect(db.none.mock.calls[1][1]).toEqual({
        'id': 1,
        'name': 'BrandedShoes',
        'description': 'cooler product',
        'price':21.50,
        'type':'wearable',
        'image_url_array':['a','b','c'],
        'item_size':'9.5',
        'gender':'mens'
      });
      done()
    })
})
// test('Products DELETE Request', done => {
//   db.none.mockImplementation((...rest) => Promise.resolve())
//   productsService.delete(1)
//     .then(() => {
//       expect(db.none.mock.calls[2][0]).toBe('DELETE FROM users WHERE id=${id}')
//       expect(db.none.mock.calls[2][1]).toEqual({
//         'id': 1
//       });
//       done()
//     })
// })

//===CONNECTION TEST===
const request = require('supertest');
const {app} = require('../app');
test('connecting to Products POST',done => {
  request(app)
  .post('/products/')
  .then((res)=>{
    expect(res.status).toBe(201);
    done();
  })
})
test('connecting to Products GET',done => {
  request(app)
  .get('/products/1')
  .then((res)=>{
    expect(res.status).toBe(200);
    done();
  })
})
test('connecting to Products PUT',done => {
  request(app)
  .put('/products/1')
  .then((res)=>{
    expect(res.status).toBe(201);
    done();
  })
})
//===REJECT===
test('connecting to Products POST Request', done => {
  db.none.mockImplementation((...rest) => Promise.reject())
  request(app)
  .post('/products/')
    .then((res) => {
      expect(res.status).toBe(400);
    done();
    })
})
test('connecting to Products GET Request', done => {
  db.one.mockImplementation((...rest) => Promise.reject())
  request(app)
  .get('/products/1')
    .then((res) => {
      expect(res.status).toBe(400);
    done();
    })
})
test('connecting to Products PUT Request', done => {
  db.none.mockImplementation((...rest) => Promise.reject())
  request(app)
  .put('/products/1')
    .then((res) => {
      expect(res.status).toBe(400);
    done();
    })
})
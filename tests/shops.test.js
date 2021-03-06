// const {app} = require('../app')
// const request = require('supertest')
jest.mock('../services/dbConnect')
const {
  db
} = require('../services/dbConnect')
const shopsService = require('../services/shops')

test('Shop POST Request', done => {
  db.none.mockImplementation((...rest) => Promise.resolve())
  shopsService.create(2,'myName','boringBio','', 'noSocialMedia')
    .then(() => {
      expect(db.none.mock.calls[0][0]).toBe('INSERT INTO shop (owner, name, bio, picture, socialmedia) VALUES (${owner},${name},${bio},${picture},${socialmedia});');
      expect(db.none.mock.calls[0][1]).toEqual({
        'owner':2,
        'name': 'myName',
        'bio': 'boringBio',
        'picture':'',
        'socialmedia': 'noSocialMedia'
      });
      done()
    })
})
test('Shop GET Request', done => {
  db.one.mockImplementation((...rest) => Promise.resolve())
  shopsService.read(1)
    .then(() => {
      expect(db.one.mock.calls[0][0]).toBe('SELECT * from shop WHERE id=${id}');
      done()
    })
})
test('Shop UPDATE Request', done => {
  db.none.mockImplementation((...rest) => Promise.resolve())
  shopsService.update(1, 'myShop', 'interestingBio','interestingPhoto', 'twitter.com/shop')
    .then(() => {
      expect(db.none.mock.calls[1][0]).toBe('UPDATE shop SET name=${name},bio=${bio},picture=${picture} socialmedia=${socialmedia} WHERE id=${id}')
      expect(db.none.mock.calls[1][1]).toEqual({
        id: 1,
        name: 'myShop',
        bio: 'interestingBio',
        picture: 'interestingPhoto',
        socialmedia: 'twitter.com/shop'
      });
      done()
    })
})
test('Shop get PRODUCTS Request', done => {
  db.any.mockImplementation((...rest) => Promise.resolve())
  shopsService.readProducts(1)
    .then(() => {
      expect(db.any.mock.calls[0][0]).toBe('SELECT shop.name , products.* FROM products JOIN shop ON shop_id = ${id} WHERE (shop.id = ${id})')
      expect(db.any.mock.calls[0][1]).toEqual({
        'id': 1
      });
      done()
    })
})
test('Shop get ALL SHOPS Request', done => {
  db.any.mockImplementation((...rest) => Promise.resolve())
  shopsService.readShops()
    .then(() => {
      expect(db.any.mock.calls[1][0]).toBe('SELECT * FROM shop')
      expect(db.any.mock.calls[1][1]).toEqual({
      });
      done()
    })
})
// test('Shop DELETE Request', done => {
//   db.none.mockImplementation((...rest) => Promise.resolve())
//   shopsService.delete(1)
//     .then(() => {
//       expect(db.none.mock.calls[2][0]).toBe('DELETE FROM users WHERE id=${id}')
//       expect(db.none.mock.calls[2][1]).toEqual({
//         'id': 1
//       });
//       done()
//     })
// })

//===CONNECTION TEST===
//===RESOLVE===
const request = require('supertest');
const {app} = require('../app');
test('connecting to Shops POST',done => {
  request(app)
  .post('/shop/')
  .then((res)=>{
    expect(res.status).toBe(201);
    done();
  })
})
test('connecting to Shops GET',done => {
  request(app)
  .get('/shop/1')
  .then((res)=>{
    expect(res.status).toBe(200);
    done();
  })
})
test('connecting to Shops PUT',done => {
  request(app)
  .put('/shop/1')
  .then((res)=>{
    expect(res.status).toBe(201);
    done();
  })
})
test('connecting to Shops GET Products',done => {
  request(app)
  .get('/shop/1/products')
  .then((res)=>{
    expect(res.status).toBe(200);
    done();
  })
})
test('connecting to Shops GET all shops',done => {
  request(app)
  .get('/shop/all')
  .then((res)=>{
    expect(res.status).toBe(200);
    done();
  })
})

//===REJECT===
test('connecting to Shop POST Request', done => {
  db.none.mockImplementation((...rest) => Promise.reject())
  request(app)
  .post('/shop/')
    .then((res) => {
      expect(res.status).toBe(400);
    done();
    })
})
test('connecting to Shop GET Request', done => {
  db.one.mockImplementation((...rest) => Promise.reject())
  request(app)
  .get('/shop/1')
    .then((res) => {
      expect(res.status).toBe(400);
    done();
    })
})
test('connecting to Shop PUT Request', done => {
  db.none.mockImplementation((...rest) => Promise.reject())
  request(app)
  .put('/shop/1')
    .then((res) => {
      expect(res.status).toBe(400);
    done();
    })
})
test('connecting to Shop GET Request Products', done => {
  db.any.mockImplementation((...rest) => Promise.reject())
  request(app)
  .get('/shop/1/products')
    .then((res) => {
      expect(res.status).toBe(400);
    done();
    })
})
test('connecting to Shop GET Request all shops', done => {
  db.any.mockImplementation((...rest) => Promise.reject())
  request(app)
  .get('/shop/all')
    .then((res) => {
      expect(res.status).toBe(400);
    done();
    })
})
const express = require('express');
const shopsRouter = express.Router();
const shopsService = require('../services/shops');

// POST - CREATE 
shopsRouter.post('/', (req, res) => {
  const {owner, name, bio, picture, socialmedia} = req.body;
  shopsService.create(owner, name, bio,picture, socialmedia)
    .then(data => {
      res.status(201);
      res.send({success: `Created shop with name: ${name}`});
    })
    .catch(err => {
      res.status(400);
      res.send({"Message":err})
    })
});
shopsRouter.get('/all', (req, res) => {
  shopsService.readShops()
    .then(data => {
      res.status(200);
      res.send(data);
    })
    .catch(err => {
      res.status(400);
      res.send({"Message":err})
    })
});
// GET - READ 
shopsRouter.get('/:id/', (req, res) => {
  const {id} = req.params;
  shopsService.read(id)
    .then(data => {
      res.status(200);
      res.send(data);
    })
    .catch(err => {
      res.status(400);
      res.send({"Message":err})
    })
});

// PUT - UPDATE
shopsRouter.put('/:id', (req, res) => {
  const {name, bio, picture, socialmedia} = req.body;
  const {id} = req.params;

  shopsService.update(id, name, bio, picture, socialmedia)
    .then(data => {
      res.status(201);
      res.send({success: `Updated shop ${id} with new name, bio, or social media`});
    })
    .catch(err => {
      res.status(400);
      res.send({"Message":err})
    })
});

// // DELETE - DELETE
// shopsRouter.delete('/:id', (req, res) => {
//   const {id} = req.params;
//   shopsService.delete(id)
//     .then(data => {
//       res.status(200)
//       res.send({success: `Deleted shop: ${id}`});
//     })
//     .catch(err => {
//       res.status(400);
//       res.send({"Message":err})
//     })
// });

//GET - GET PRODUCT FROM STORE ID
shopsRouter.get('/:id/products', (req, res) => {
  const {id} = req.params;
  shopsService.readProducts(id)
    .then(data => {
      res.status(200);
      res.send(data);
    })
    .catch(err => {
      res.status(400);
      res.send({"Message":err})
    })
});
shopsRouter.get('/shop/:name', (req,res)=>{
  const {name} = req.params;
  shopsService.findShop(name)
  .then(data =>{
    res.status(200);
    res.send(data);
  })
  .catch(err=>{
    res.status(400);
    res.send({"Message":err})
  })
})
shopsRouter.get('/owner/:id/:email', (req,res)=>{
  const { id, email } = req.params;
  shopsService.findOwner(id,email)
  .then(data =>{
    res.status(200);
    res.send(data);
  })
  .catch(err=>{
    res.status(400);
    res.send({"Message":err})
  })
})

module.exports = {shopsRouter};

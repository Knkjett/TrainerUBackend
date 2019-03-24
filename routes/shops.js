const express = require('express');
const shopsRouter = express.Router();
const shopsService = require('../services/shops');

// POST - CREATE 
shopsRouter.post('/', (req, res) => {
  const {name, bio, socialmedia} = req.body;
  shopsService.create(name, bio, socialmedia)
    .then(data => {
      res.status(201);
      res.send({success: `Created shop named ${name}`});
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
  const {name, bio, socialmedia} = req.body;
  const {id} = req.params;

  shopsService.update(id, name, bio, socialmedia)
    .then(data => {
      res.status(201);
      res.send({success: `Updated shop ${id} with new name, bio, orsocial media`});
    })
    .catch(err => {
      res.status(400);
      res.send({"Message":err})
    })
});

// DELETE - DELETE
shopsRouter.delete('/:id', (req, res) => {
  const {id} = req.params;
  shopsService.delete(id)
    .then(data => {
      res.status(200)
      res.send({success: `Deleted shop: ${id}`});
    })
    .catch(err => {
      res.status(400);
      res.send({"Message":err})
    })
});

//GET - GET PRODUCT
shopsRouter.get('/:name/products/product_id', (req, res) => {
  const {name} = req.params;
  shopsRouter.readProduct(product_id)
      .then((data) => {
          res.json(data);
      })
      .catch((err) => {
        res.status(400);
        res.send({"Message":err})
      })
})

module.exports = {shopsRouter};

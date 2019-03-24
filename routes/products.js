const express = require('express');
const productsRouter = express.Router();
const productsService = require('../services/products');

// POST - CREATE 
productsRouter.post('/', (req, res) => {
  const {shop_id, name, description, price, type, image_url_array, item_size, gender} = req.body;
  productsService.create(shop_id, name, description, price, type, image_url_array, item_size, gender)
    .then(data => {
      res.status(201);
      res.send({success: `Created product named ${name}`});
    })
    .catch(err => {
      res.status(400);
      res.send({"Message":err})
    })
});

// GET - READ 
productsRouter.get('/:id', (req, res) => {
  const {id} = req.params;
  productsService.read(id)
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
productsRouter.put('/:id', (req, res) => {
  const {name, description, price, type, image_url_array, item_size, gender} = req.body;
  const {id} = req.params;

  productsService.update(id, name, description, price, type, image_url_array, item_size, gender)
    .then(data => {
      res.status(201);
      res.send({success: `Updated Product named ${name} with product info`});
    })
    .catch(err => {
      res.status(400);
      res.send({"Message":err})
    })
});

// DELETE - DELETE
productsRouter.delete('/:id', (req, res) => {
  const {id} = req.params;

  productsService.delete(id)
    .then(data => {
      res.json({success: `Deleted product with id: ${id}`});
    })
    .catch(err => {
      res.status(400);
      res.send({"Message":err})
    })
});

module.exports = {productsRouter};

const express = require('express');
const orderItemRouter = express.Router();
const orderItemService = require('../services/order_item');

// POST - CREATE 
orderItemRouter.post('/', (req, res) => {
  const {shop_id, order_id, product_id, amount} = req.body;
  orderItemService.create(shop_id, order_id, product_id, amount)
    .then(data => {
      res.status(201);
      res.send({success: `Created order items for order id: ${order_id}`});
    })
    .catch(err => {
      console.log(err)
      res.status(400);
      res.send({"Message":err})
    })
});

// GET - READ 
orderItemRouter.get('/:id', (req, res) => {
  const {id} = req.params;
  orderItemService.read(id)
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
orderItemRouter.put('/:id', (req, res) => {
  const {shop_id, order_id, product_id, amount} = req.body;
  const {id} = req.params;

  orderItemService.update(id, shop_id, order_id, product_id, amount)
    .then(data => {
      res.send({success: `Updated Order Item for order ${order_id} with new info`});
    })
    .catch(err => {
      res.status(400);
      res.send({"Message":err})
    })
});

// // DELETE - DELETE
// orderItemRouter.delete('/:id', (req, res) => {
//   const {id} = req.params;
//   orderItemService.delete(id)
//     .then(data => {
//       res.json({success: `Deleted order item id: ${id}`});
//     })
//     .catch(err => {
//       res.status(400);
//       res.send({"Message":err})
//     })
// });

module.exports = {orderItemRouter};

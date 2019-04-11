const express = require('express');
const orderListRouter = express.Router();
const orderListService = require('../services/order_list');

// POST - CREATE 
orderListRouter.post('/', (req, res) => {
  const {user_id, first_name, last_name, address,address2, city, zipcode, email, total_amount,payment_token} = req.body;
  orderListService.create(user_id, first_name, last_name, address,address2,city, zipcode, email,total_amount,payment_token)
    .then(data => {
      res.status(201);
      res.send({success: `Created order list for user: ${user_id}`});
    })
    .catch(err => {
      res.status(400);
      res.send({"Message":err})
    })
});

// GET - READ 
orderListRouter.get('/:id', (req, res) => {
  const {id} = req.params;
  orderListService.read(id)
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
orderListRouter.put('/:id', (req, res) => {
  const {user_id, address,address2,city, zipcode,total_amount,payment_token} = req.body;
  const {id} = req.params;

  orderListService.update(id, user_id, address,address2,city, zipcode,total_amount,payment_token)
    .then(data => {
      res.status(201);
      res.send({success: `Updated Order List for user ${user_id} with new info`});
    })
    .catch(err => {
      res.status(400);
      res.send({"Message":err})
    })
});

// // DELETE - DELETE
// orderListRouter.delete('/:id', (req, res) => {
//   const {id} = req.params;
//   orderListService.delete(id)
//     .then(data => {
//       res.json({success: `Deleted orderList with id: ${id}`});
//     })
//     .catch(err => {
//       res.status(400);
//       res.send({"Message":err})
//     })
// });

// GET - READ 
orderListRouter.get('/:id/items', (req, res) => {
  const {id} = req.params;
  orderListService.readItems(id)
    .then(data => {
      res.status(200);
      res.send(data);
    })
    .catch(err => {
      res.status(400);
      res.send({"Message":err})
    })
});

module.exports = {orderListRouter};

const express = require('express');
const userRouter = express.Router();
const userService = require('../services/users');

// POST - CREATE 
userRouter.post('/', (req, res) => {
  const {email, token} = req.body;
  userService.create(email, token)
    .then(data => {
      res.status(201);
      res.send({ success: `Created user named ${email}`});
    })
    .catch(err => {
      res.status(400);
      res.send({"Message":err})
    })
});

// GET - READ 
userRouter.get('/:email', (req, res) => {
  const {email} = req.params;
  userService.read(email)
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
userRouter.put('/:id', (req, res) => {
  const {id} = req.params;
  const {email, token} = req.body;

  userService.update(id,email,token)
    .then(data => {
      res.status(201);
      res.send({success: `Updated user: ${id} with new data.`});
    })
    .catch(err => {
      res.status(400);
      res.send({"Message":err})
    })
});

// // DELETE - DELETE
// userRouter.delete('/:id', (req, res) => {
//   const {id} = req.params;
//   userService.delete(id)
//     .then(data => {
//       res.status(200);
//       res.send({success: `Deleted user: ${id}`});
//     })
//     .catch(err => {
//       res.status(400);
//       res.send({"Message":err})
//     })
// });

module.exports = {userRouter};

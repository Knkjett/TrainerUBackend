const express = require('express');
const userRouter = express.Router();
const userService = require('../services/trainer');

// POST - CREATE 
userRouter.post('/', (req, res, next) => {
  const {name, email, token} = req.body;
  userService.create(name, email, token)
    .then(data => {
      res.json({success: `Created user named ${name} with special ID: ${data.id}`});
    })
    .catch(err => {
      console.log(err)
      next(err);
    })
});

// GET - READ 
userRouter.get('/:name/', (req, res, next) => {
  const {name} = req.params;
  userService.read(name)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err)
      next(err);
    })
});

// PUT - UPDATE
userRouter.put('/:name', (req, res, next) => {
  const {email} = req.body;
  const {name} = req.params;

  userService.update(name, email)
    .then(data => {
      res.json({success: `Updated user named ${name} with new email: ${email}`});
    })
    .catch(err => {
      console.log(err)
      next(err);
    })
});

// DELETE - DELETE
userRouter.delete('/:name', (req, res, next) => {
  const {name} = req.params;

  userService.delete(name)
    .then(data => {
      res.json({success: `Deleted user named ${name}`});
    })
    .catch(err => {
      console.log(err)
      next(err);
    })
});

userRouter.get('/:name/order', (req, res, next) => {
  const {name} = req.params;

});

module.exports = userRouter;

#TrainersU

**Backend for TrainersU**

[![Build Status](https://travis-ci.org/Knkjett/TrainerUBackend.svg?branch=master)](https://travis-ci.org/Knkjett/TrainerUBackend)
[![Coverage Status](https://coveralls.io/repos/github/Knkjett/TrainerUBackend/badge.svg?branch=master)](https://coveralls.io/github/Knkjett/TrainerUBackend?branch=master)
[Heroku](https://traineru.herokuapp.com/)
---
*Basic Routes*

 - User -> body for post/update -> *email, token*
   - POST `/`
   - GET by id number`/:id`
   - UPDATE by `/id`
 - Shop -> body for post/update -> *name, bio=' ', socialmedia=' '*
   - POST `/`
   - GET by id number`/:id`
   - UPDATE by `/id`
   - GET all products by id number `/:id/products`
 - Product -> body for post/update -> *shop\_id, name, description, price, type, image\_url\_array=[ ], item\_size=' ', gender=' '*
   - POST `/`
   - GET by id number`/:id`
   - UPDATE by `/id` param -> *id*
 - Order List -> body for post/update -> *user\_id, address, address2=' ', city, zipcode, total\_amount, payment\_token*
   - POST `/` 
   - GET by id number`/:id`
   - UPDATE by `/id` param -> *id*
   - GET items by id number `/:id/items`
 - Order Item -> body for post/update -> *shop/_id, order\_id, product\_id, amount*
   - POST `/`
   - GET by id number`/:id`
   - UPDATE by `/id` param -> *id*

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

const userRouter = require('./routes/users');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/user', userRouter);

app.get('/ping',(req,res)=>{
    res.status(200);
    res.json({'ping':'🏓'})
  });

app.listen(port, ()=>{
    console.log(`Listening. TrainerU on port: ${port}`)
})

// All
// - id (unique)
// - createdAt
// - updatedAt

// Users
// - email
// - name

// Shop
// - user_id
// - name
// - bio
// - social_media {IG, Facebook}

// Products
// - shop_id
// - name
// - description
// - image_url_array 
// - price
// - type [ Lesson, wearables, etc ]
// - size (null)
// - gender

// Order
// - address
// - address2
// - city
// - zipcode
// - total_amount
// - payment_token

// Order_item
// - shop_id
// - order_id
// - product_id
// - amount (AMOUNT OF THE ITEM)
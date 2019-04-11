const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors')
//Routes
const {userRouter} = require('./routes/users');
const {shopsRouter} = require('./routes/shops');
const {productsRouter} = require('./routes/products');
const {orderListRouter} = require('./routes/order_list');
const {orderItemRouter} = require('./routes/order_item');

//Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/shop', shopsRouter);
app.use('/products', productsRouter);
app.use('/orders',orderListRouter);
app.use('/orderitem',orderItemRouter);

module.exports = {app}
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
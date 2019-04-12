const {db} = require('./dbConnect');
const OrderListService = {};

OrderListService.create = (user_id, first_name, last_name, address,address2='',city, zipcode, email,total_amount,payment_token) =>{
  return db.one( 'INSERT INTO orderlist (user_id, first_name, last_name, address,address2,city, zipcode, email,total_amount,payment_token) VALUES (${user_id}, ${first_name}, ${last_name},${address}, ${address2}, ${city}, ${zipcode},${email}, ${total_amount}, ${payment_token}) RETURNING id',{
    user_id, first_name, last_name, address,address2,city, zipcode, email,total_amount,payment_token
  });
}
OrderListService.read = (id) =>{
  return db.one ( 'SELECT * from orderlist WHERE id=${id};',{
    id
  });
}
OrderListService.update = (id, user_id, address, address2='', city, zipcode, total_amount, payment_token) =>{
  return db.none( 'UPDATE orderlist SET user_id=${user_id},address=${address},address2=${address2},city=${city},zipcode=${zipcode},total_amount=${total_amount}, payment_token=${payment_token} WHERE id=${id};',{
    id, user_id, address, address2, city, zipcode, total_amount, payment_token
  })
}
// OrderListService.delete = (id) => {
//   return db.none( 'DELETE FROM orderlist WHERE id=${id} ',{
//     id
//   })
// }

//Grab Order Items by ORDER ID
OrderListService.readItems = (id) =>{
  return db.any ( 'SELECT products.*, order_item.amount FROM order_item JOIN orderlist ON order_id= 1 JOIN products ON product_id = order_item.product_id WHERE (order_id = ${id} AND products.id = order_item.id);',{
    id
  });
}
module.exports = OrderListService;
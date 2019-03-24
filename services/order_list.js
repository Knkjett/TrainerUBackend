const {db} = require('./dbConnect');
const OrderListService = {};

OrderListService.create = (user_id, address, address2='', city, zipcode, total_amount, payment_token) =>{
  return db.none( 'INSERT INTO orderlist (user_id, address, address2, city, zipcode, total_amount, payment_token) VALUES (${user_id}, ${address}, ${address2}, ${city}, ${zipcode}, ${total_amount}, ${payment_token}); ',{
    user_id, address, address2, city, zipcode, total_amount, payment_token
  });
}
OrderListService.read = (id) =>{
  return db.one ( 'SELECT * from orderlist WHERE id=${id} ',{
    id
  });
}
OrderListService.update = (id, user_id, address, address2='', city, zipcode, total_amount, payment_token) =>{
  return db.none( 'UPDATE orderlist SET user_id=${user_id},address=${address},address2=${address2},city=${city},zipcode=${zipcode},total_amount=${total_amount}, payment_token=${payment_token} WHERE id=${id} ',{
    id, user_id, address, address2, city, zipcode, total_amount, payment_token
  })
}
OrderListService.delete = (id) => {
  return db.none( 'DELETE FROM orderlist WHERE id=${id} ',{
    id
  })
}

module.exports = OrderListService;
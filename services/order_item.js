const {db} = require('./dbConnect');
const OrderItemService = {};

OrderItemService.create = (shop_id,user_id, order_id, product_id, amount) =>{
  return db.none('INSERT INTO order_item (shop_id,user_id, order_id, product_id, amount) VALUES (${shop_id},${user_id}, ${order_id}, ${product_id}, ${amount});',{
    shop_id, user_id, order_id, product_id, amount
  });
}
OrderItemService.read = (id) =>{
  return db.any ('SELECT order_item.* FROM orderlist JOIN order_item ON order_id = orderlist.id WHERE orderlist.user_id = ${id}',{
    id
  });
}
OrderItemService.update = (id,amount) =>{
  return db.none('UPDATE order_item SET amount = ${amount} WHERE id=${id};',{
    id,amount
  })
}
// OrderItemService.delete = (order_id) => {
//   return db.none('DELETE FROM order_item WHERE id=${order_id}',{
//     order_id
//   })
// }
OrderItemService.getitems = (id) =>{
  return db.any('SELECT order_item.* FROM orderlist JOIN order_item ON order_id = orderlist.id WHERE orderlist.user_id = ${id}',{
    id
  })
}

module.exports = OrderItemService;
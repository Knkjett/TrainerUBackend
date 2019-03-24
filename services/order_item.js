const {db} = require('./dbConnect');
const OrderItemService = {};

OrderItemService.create = (shop_id, order_id, product_id, amount) =>{
  return db.none('INSERT INTO order_item (shop_id, order_id, product_id, amount) VALUES (${shop_id}, ${order_id}, ${product_id}, ${amount});',{
    shop_id, order_id, product_id, amount
  });
}
OrderItemService.read = (id) =>{
  return db.one ('SELECT * from order_item WHERE id=${id}',{
    id
  });
}
//CAN ONLY CHANGE AMOUNT OF ITEMS AND NOTHING ELSE.
OrderItemService.update = (id, shop_id, order_id, product_id, amount) =>{
  return db.none('UPDATE order_item SET amount = ${amount} WHERE id=${id}',{
    id, shop_id, order_id, product_id, amount
  })
}
OrderItemService.delete = (order_id) => {
  return db.none('DELETE FROM order_item WHERE id=${order_id}',{
    order_id
  })
}

module.exports = OrderItemService;
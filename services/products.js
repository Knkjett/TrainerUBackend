const {db} = require('./dbConnect');
const ProductsService = {};

ProductsService.create = (shop_id, name, description, price, type, image_url_array=[], item_size='', gender='') =>{
  return db.none('INSERT INTO products (shop_id, name, description, price, type, image_url_array, item_size, gender) VALUES (${shop_id}, ${name}, ${description}, ${price}, ${type}, ${image_url_array}, ${item_size}, ${gender});',{
    shop_id, name, description, price, type, image_url_array, item_size, gender
  });
}
ProductsService.read = (id) =>{
  return db.one ('SELECT * from products WHERE id=${id}',{
    id
  });
}
ProductsService.update = (id, name, description, price, type, image_url_array=[], item_size='', gender='') =>{
  return db.none('UPDATE products SET name = ${name}, description=${description}, price=${price}, type=${type},image_url_array=${image_url_array},item_size=${item_size},gender=${gender} WHERE id=${id}',{
    id, name, description, price, type, image_url_array, item_size, gender
  })
}
ProductsService.delete = (id) => {
  return db.none('DELETE FROM products WHERE id=${id}',{
    id
  })
}
ProductsService.getall = (shop_id) =>{
  return db.any ('SELECT name from products WHERE shop_id=${shop_id}',{
    shop_id
  });
}

module.exports = ProductsService;
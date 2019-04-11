const {db} = require('./dbConnect');
const ProductsService = {};

ProductsService.create = (shop_id, name, description, price, type, image_url_array=[], option='', available ) =>{
  return db.none('INSERT INTO products (shop_id, name, description, price, type, image_url_array, option, available) VALUES (${shop_id}, ${name}, ${description}, ${price}, ${type}, ${image_url_array}, ${option}, ${available});',{
    shop_id, name, description, price, type, image_url_array, option, available
  });
}
ProductsService.read = (id) =>{
  return db.one ('SELECT * from products WHERE id=${id}',{
    id
  });
}
ProductsService.update = (id, name, description, price, type, image_url_array=[], option='', available) =>{
  return db.none('UPDATE products SET name = ${name}, description=${description}, price=${price}, type=${type}, image_url_array=${image_url_array},option=${option},available=${available} WHERE id=${id}',{
    id, name, description, price, type, image_url_array, option, available
  })
}
// ProductsService.delete = (id) => {
//   return db.none('DELETE FROM products WHERE id=${id}',{
//     id
//   })
// }
ProductsService.getAll = () =>{
  return db.any ('SELECT * FROM products',{
  });
}
ProductsService.findAll = (type) =>{
  return db.any('SELECT * FROM products WHERE type=${type}',{
    type
  });
}
ProductsService.findSpecType = (id , type) =>{
  return db.any('SELECT * FROM products WHERE shop_id=${id} AND type=${type}',{
    id,
    type
  });
}

module.exports = ProductsService;
const {db} = require('./dbConnect');
const ShopsService = {};

ShopsService.create = (name, bio = '', socialmedia = '') =>{
  return db.none('INSERT INTO shop (name, bio, socialmedia) VALUES (${name},${bio},${socialmedia});',{
    name,
    bio,
    socialmedia
  });
}
ShopsService.read = (id) =>{
  return db.one ('SELECT name, bio, socialmedia from shop WHERE id=${id}',{
    id
  });
}
ShopsService.update = (id, name, bio ='',socialmedia='') =>{
  return db.none('UPDATE shop SET name=${name},bio=${bio}, socialmedia=${socialmedia} WHERE id=${id}',{
    id,
    name,
    bio,
    socialmedia
  })
}
// ShopsService.delete = (id) => {
//   return db.none('DELETE FROM shop WHERE id=${id}',{
//     id
//   })
// }
//GET /:id/products
ShopsService.readProducts = (id) => {
  return db.any('SELECT shop.name , products.* FROM products JOIN shop ON shop_id = ${id} WHERE (shop.id = ${id})', {
      id
  });
}
module.exports = ShopsService;
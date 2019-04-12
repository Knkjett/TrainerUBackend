const {db} = require('./dbConnect');
const ShopsService = {};

ShopsService.create = (owner, name, bio = '',picture= '', socialmedia = '') =>{
  return db.one('INSERT INTO shop (owner, name, bio, picture, socialmedia) VALUES (${owner},${name},${bio},${picture},${socialmedia}) RETURNING id;',{
    owner,
    name,
    bio,
    picture,
    socialmedia
  });
}
ShopsService.read = (id) =>{
  return db.one ('SELECT * from shop WHERE id=${id}',{
    id
  });
}
ShopsService.update = (id, name, bio ='', picture='',socialmedia='') =>{
  return db.none('UPDATE shop SET name=${name},bio=${bio},picture=${picture} socialmedia=${socialmedia} WHERE id=${id}',{
    id,
    name,
    bio,
    picture,
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
//GET /shops/all
ShopsService.readShops = () =>{
  return db.any ('SELECT * FROM shop',{
  });
}
ShopsService.findShop = (name) =>{
  return db.any ('SELECT * from shop WHERE name = ${name}',{
    name
  })
}
ShopsService.findOwner = (id,email)=>{
  return db.any ('SELECT shop.* FROM shop JOIN users ON shop.owner=${id} WHERE users.email=${email}',{
    id, email
  })
}
module.exports = ShopsService;
const {db} = require('./dbConnect');
const UserService = {};


UserService.create = (email,token) =>{
  return db.none('INSERT INTO users (email,token) VALUES (${email}, ${token});',{
    email,
    token
  });
}
UserService.read = (email) =>{
  return db.one ('SELECT id from users WHERE email=${email}',{
    email
  });
}
UserService.update = (id,email, token) =>{
  return db.none('UPDATE users SET email = ${email}, token = ${token} WHERE id=${id}',{
    id,
    email,
    token
  })
}
// UserService.delete = (id) => {
//   return db.none('DELETE FROM users WHERE id=${id}',{
//     id
//   })
// }

module.exports = UserService;
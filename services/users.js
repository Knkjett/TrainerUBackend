const {db} = require('./dbConnect');
const UserService = {};


UserService.create = (email,token) =>{
  return db.none('INSERT INTO users (email,token) VALUES (${email}, ${token});',{
    email,
    token
  });
}
UserService.read = (id) =>{
  return db.one ('SELECT email from users WHERE id=${id}',{
    id
  });
}
UserService.update = (id,email) =>{
  return db.none('UPDATE users SET email = ${email} WHERE id=${id}',{
    id,
    email
  })
}
UserService.delete = (id) => {
  return db.none('DELETE FROM users WHERE id=${id}',{
    id
  })
}

module.exports = UserService;
const pgp = require('pg-promise')({});
const db = pgp('postgres://postgres:123@localhost:5432/traineru');
const UserService = {};

UserService.create = (name, email) =>{
  return db.none(`INSERT INTO users (name, email) VALUES (${name},${email});`,{
    name,
    email
  });
}
UserService.read = (id) =>{
  return db.one (`SELECT name from users WHERE id=${id}`,{
    id
  });
}
UserService.update = (name, email) =>{
  return db.none(`UPDATE users SET email = ${email}, WHERE name=${name}`,{
    name,
    email
  })
}
UserService.delete = (name) => {
  return db.none(`DELETE FROM users WHERE name=${name}`,{
    name
  })
}

module.exports = UserService;
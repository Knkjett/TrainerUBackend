const pgp = require('pg-promise')({});
const db = pgp(process.env.DATABASE_URL || 'postgres://postgres:123@localhost:5432/traineru');


module.exports = {
    db,
}
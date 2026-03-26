const knex = require('knex');
require('dotenv').config();

module.exports = async () => {
  return knex({
    client: 'sqlite3',
    connection: {
      filename: process.env.DB_PATH || './db/database.sqlite'
    },
    useNullAsDefault: true,
    migrations: {
      directory: require('path').join(__dirname, '../migrations')
    }
  });
};

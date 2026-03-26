const knex = require('knex');
require('dotenv').config();

module.exports = {
  development: require('./knexfile'),
  production: require('./knexfile')
};

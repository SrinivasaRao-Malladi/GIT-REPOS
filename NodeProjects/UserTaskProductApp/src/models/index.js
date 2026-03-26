const { knex } = require('../config/knex');

module.exports = {
  // User model
  user: (knex) => knex('users'),

  // Task model
  task: (knex) => knex('tasks'),

  // Product model
  product: (knex) => knex('products')
};

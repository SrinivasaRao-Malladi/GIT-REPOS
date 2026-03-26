const { z } = require('zod');
const { knex } = require('../config/knex');

// User schema validation
const userSchema = z.object({
  id: z.number().int(),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  role: z.enum(['admin', 'user']),
  createdAt: z.number().int(),
  updatedAt: z.number().int()
});

// User model definition
const UserModel = {
  // Get all users
  getAll: async (knex) => {
    const result = await knex('users').select('*');
    return result;
  },

  // Get user by ID
  getById: async (knex, id) => {
    const result = await knex('users')
      .select('*')
      .where('id', id);
    return result[0] || null;
  },

  // Create new user
  create: async (knex, data) => {
    const result = await knex('users').insert(data).returning('*');
    return result[0];
  },

  // Update user
  update: async (knex, id, data) => {
    const result = await knex('users')
      .where('id', id)
      .update(data)
      .returning('*');
    return result[0] || null;
  },

  // Delete user
  delete: async (knex, id) => {
    await knex('users').where('id', id).del();
    return true;
  }
};

module.exports = {
  schema: userSchema,
  model: UserModel
};

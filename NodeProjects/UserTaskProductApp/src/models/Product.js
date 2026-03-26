const { z } = require('zod');
const { knex } = require('../config/knex');

// Product schema validation
const productSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1).max(200),
  description: z.string().nullable(),
  price: z.number().positive(),
  stock: z.number().int().default(0),
  category: z.string().min(1).max(100),
  createdAt: z.number().int(),
  updatedAt: z.number().int()
});

// Product model definition
const ProductModel = {
  // Get all products
  getAll: async (knex) => {
    const result = await knex('products').select('*');
    return result;
  },

  // Get product by ID
  getById: async (knex, id) => {
    const result = await knex('products')
      .select('*')
      .where('id', id);
    return result[0] || null;
  },

  // Create new product
  create: async (knex, data) => {
    const result = await knex('products').insert(data).returning('*');
    return result[0];
  },

  // Update product
  update: async (knex, id, data) => {
    const result = await knex('products')
      .where('id', id)
      .update(data)
      .returning('*');
    return result[0] || null;
  },

  // Delete product
  delete: async (knex, id) => {
    await knex('products').where('id', id).del();
    return true;
  }
};

module.exports = {
  schema: productSchema,
  model: ProductModel
};

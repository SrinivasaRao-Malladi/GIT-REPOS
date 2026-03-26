const { z } = require('zod');
const { knex } = require('../config/knex');

// Task schema validation
const taskSchema = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  title: z.string().min(1).max(200),
  description: z.string().nullable(),
  status: z.enum(['pending', 'in_progress', 'completed']),
  priority: z.enum['low', 'medium', 'high'],
  dueDate: z.date().optional(),
  createdAt: z.number().int(),
  updatedAt: z.number().int()
});

// Task model definition
const TaskModel = {
  // Get all tasks
  getAll: async (knex) => {
    const result = await knex('tasks').select('*');
    return result;
  },

  // Get task by ID
  getById: async (knex, id) => {
    const result = await knex('tasks')
      .select('*')
      .where('id', id);
    return result[0] || null;
  },

  // Create new task
  create: async (knex, data) => {
    const result = await knex('tasks').insert(data).returning('*');
    return result[0];
  },

  // Update task
  update: async (knex, id, data) => {
    const result = await knex('tasks')
      .where('id', id)
      .update(data)
      .returning('*');
    return result[0] || null;
  },

  // Delete task
  delete: async (knex, id) => {
    await knex('tasks').where('id', id).del();
    return true;
  }
};

module.exports = {
  schema: taskSchema,
  model: TaskModel
};
const { z } = require('zod');

module.exports = {
  // Task schema with Zod validation
  taskSchema: z.object({
    id: z.number().int(),
    userId: z.number().int(),
    title: z.string().min(1).max(200),
    description: z.string().nullable(),
    status: z.enum(['pending', 'in_progress', 'completed']),
    priority: z.enum(['low', 'medium', 'high']),
    dueDate: z.date().optional(),
    createdAt: z.number().int(),
    updatedAt: z.number().int()
  })
};

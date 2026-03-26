const { z } = require('zod');

module.exports = {
  // Product schema with Zod validation
  productSchema: z.object({
    id: z.number().int(),
    name: z.string().min(1).max(200),
    description: z.string().nullable(),
    price: z.number().positive(),
    stock: z.number().int().default(0),
    category: z.string().min(1).max(100),
    createdAt: z.number().int(),
    updatedAt: z.number().int()
  })
};

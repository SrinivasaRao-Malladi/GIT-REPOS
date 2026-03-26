const { z } = require('zod');

module.exports = {
  // User schema with Zod validation
  userSchema: z.object({
    id: z.number().int(),
    name: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    role: z.enum(['admin', 'user']),
    createdAt: z.number().int(),
    updatedAt: z.number().int()
  })
};

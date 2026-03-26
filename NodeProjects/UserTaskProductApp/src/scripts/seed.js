const { z } = require('zod');
const { knex, userSchema, taskSchema, productSchema } = require('../models');

async function seed() {
  console.log('Seeding database...');

  // Seed users
  const usersData = [
    { name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'admin' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'password123', role: 'user' }
  ];

  for (const userData of usersData) {
    await knex('users').insert(userData);
    console.log(`Created user: ${userData.name}`);
  }

  // Seed tasks
  const tasksData = [
    { userId: 1, title: 'Project Setup', description: 'Initial project configuration', status: 'completed', priority: 'high' },
    { userId: 2, title: 'Database Migration', description: 'Migrate to new schema', status: 'in_progress', priority: 'medium' },
    { userId: 1, title: 'API Documentation', description: 'Write API docs', status: 'pending', priority: 'low' }
  ];

  for (const taskData of tasksData) {
    await knex('tasks').insert(taskData);
    console.log(`Created task: ${taskData.title}`);
  }

  // Seed products
  const productsData = [
    { name: 'Laptop', description: '15.6 inch laptop', price: 999.99, stock: 25, category: 'Electronics' },
    { name: 'Mouse', description: 'Wireless mouse', price: 29.99, stock: 100, category: 'Accessories' },
    { name: 'Keyboard', description: 'Mechanical keyboard', price: 79.99, stock: 50, category: 'Accessories' }
  ];

  for (const productData of productsData) {
    await knex('products').insert(productData);
    console.log(`Created product: ${productData.name}`);
  }

  console.log('\nDatabase seeded successfully!');
}

seed();

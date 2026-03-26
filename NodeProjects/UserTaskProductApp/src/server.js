const express = require('express');
const dotenv = require('dotenv');
const { Knex } = require('knex');

// Load environment variables
dotenv.config();

// Import models and routes
const knexConfig = require('./config/knexfile');
const database = require('./config/database');
const userRoutes = require('./routes/UserRoutes');
const taskRoutes = require('./routes/TaskRoutes');
const productRoutes = require('./routes/ProductRoutes');

// Initialize database connection
const db = await database();

// Create Knex instance for all operations
const knex = new Knex(db, {
  logger: { log: true }
});

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/products', productRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;

// Start server
const startServer = async () => {
  try {
    await knex.connect();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Database: ${process.env.DB_PATH || './db/database.sqlite'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;

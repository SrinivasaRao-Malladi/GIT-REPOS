# User/Task/Product Management API

REST API for managing Users, Tasks, and Products using Node.js, Express, SQLite, and Zod validation.

## Features

- **GET** - Retrieve all items or by ID
- **POST** - Create new items
- **PUT** - Update existing items
- **DELETE** - Delete items
- **Input Validation** - Zod schema-based validation
- **Seed Script** - Populate sample data automatically

## Prerequisites

- Node.js (v14+)
- npm or yarn

## Installation

```bash
# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env with your configuration
# Change JWT_SECRET to a secure random string in production
```

## Running the Server

```bash
# Development mode (auto-restart on file changes)
npm run dev

# Production mode
npm start
```

## Database Setup

The database is created automatically at `./db/database.sqlite`.

### Seed Sample Data

```bash
npm run seed
```

This will create:
- 2 Users (1 admin, 1 user)
- 3 Tasks (various statuses and priorities)
- 3 Products (Electronics and Accessories)

## API Endpoints

### Base URL: `http://localhost:3000/api`

#### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

#### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get task by ID |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

#### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

## Testing with cURL

### Users

```bash
# Get all users
curl http://localhost:3000/api/users

# Get user by ID (admin)
curl "http://localhost:3000/api/users/1"

# Create new user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "admin"
  }'

# Update user
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated",
    "email": "john.updated@example.com"
  }'

# Delete user
curl -X DELETE http://localhost:3000/api/users/2
```

### Tasks

```bash
# Get all tasks
curl http://localhost:3000/api/tasks

# Create new task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Task",
    "userId": 1,
    "description": "Task description",
    "status": "pending",
    "priority": "high"
  }'

# Update task
curl -X PUT http://localhost:3000/api/tasks/2 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Task",
    "status": "completed"
  }'

# Delete task
curl -X DELETE http://localhost:3000/api/tasks/1
```

### Products

```bash
# Get all products
curl http://localhost:3000/api/products

# Create new product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Product",
    "description": "Product description",
    "price": 99.99,
    "stock": 100,
    "category": "Electronics"
  }'

# Update product
curl -X PUT http://localhost:3000/api/products/2 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 79.99,
    "stock": 50
  }'

# Delete product
curl -X DELETE http://localhost:3000/api/products/1
```

## Project Structure

```
src/
├── config/          # Database configuration
│   ├── knexfile.js # Knex configuration
│   └── database.js # Database connection factory
├── controllers/     # Business logic handlers
│   ├── UserController.js
│   ├── TaskController.js
│   └── ProductController.js
├── models/          # Data models with Zod schemas
│   ├── User.js
│   ├── Task.js
│   ├── Product.js
│   ├── UserValidator.js
│   ├── TaskValidator.js
│   └── ProductValidator.js
├── routes/          # API route handlers
│   ├── UserRoutes.js
│   ├── TaskRoutes.js
│   └── ProductRoutes.js
├── scripts/         # Seed script
│   └── seed.js
├── server.js        # Main entry point
└── package.json
```

## Environment Variables (.env)

```bash
# Database Configuration
DB_PATH=./db/database.sqlite

# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Secret (change this in production)
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

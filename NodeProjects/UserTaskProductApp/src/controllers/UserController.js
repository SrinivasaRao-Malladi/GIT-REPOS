const { z } = require('zod');
const UserModel = require('../models/User');
const UserValidator = require('../models/UserValidator');

// GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const data = req.body; // For validation

    if (!data || !data.id) {
      return res.status(400).json({ error: 'Missing required field: id' });
    }

    const users = await UserModel.user(knex).select('*').where('id', data.id);

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(users[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET user by ID
exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || !Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const user = await UserModel.user(knex).select('*').where('id', id);

    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST create user
exports.createUser = async (req, res) => {
  try {
    const data = req.body; // For validation

    if (!data.name || !data.email || !data.password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const validatedData = UserValidator.userSchema.parse(data);

    const user = await UserModel.user(knex).insert(validatedData).returning('*');

    res.json(user[0]);
  } catch (error) {
    console.error(error);
    if (error.issues && error.issues.length > 0) {
      return res.status(400).json({ error: 'Validation failed', issues: error.issues });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PUT update user
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || !Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    // Check if user exists
    const existingUser = await UserModel.user(knex).select('*').where('id', id);
    if (existingUser.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const data = req.body; // For validation

    if (!data.name || !data.email || !data.password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const validatedData = UserValidator.userSchema.parse(data);

    const updatedUser = await UserModel.user(knex)
      .where('id', id)
      .update(validatedData)
      .returning('*');

    res.json(updatedUser[0]);
  } catch (error) {
    console.error(error);
    if (error.issues && error.issues.length > 0) {
      return res.status(400).json({ error: 'Validation failed', issues: error.issues });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

// DELETE user
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || !Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    // Check if user exists
    const existingUser = await UserModel.user(knex).select('*').where('id', id);
    if (existingUser.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const deleted = await UserModel.user(knex).del(id);

    if (!deleted) {
      return res.status(500).json({ error: 'Failed to delete user' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

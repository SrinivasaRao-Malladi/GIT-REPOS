const { z } = require('zod');
const TaskModel = require('../models/Task');
const TaskValidator = require('../models/TaskValidator');

// GET all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const data = req.body; // For validation

    if (!data || !data.id) {
      return res.status(400).json({ error: 'Missing required field: id' });
    }

    const tasks = await TaskModel.task(knex).select('*').where('id', data.id);

    if (tasks.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(tasks[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET task by ID
exports.getTaskById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || !Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const task = await TaskModel.task(knex).select('*').where('id', id);

    if (task.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST create task
exports.createTask = async (req, res) => {
  try {
    const data = req.body; // For validation

    if (!data.title || !data.userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const validatedData = TaskValidator.taskSchema.parse(data);

    const task = await TaskModel.task(knex).insert(validatedData).returning('*');

    res.json(task[0]);
  } catch (error) {
    console.error(error);
    if (error.issues && error.issues.length > 0) {
      return res.status(400).json({ error: 'Validation failed', issues: error.issues });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PUT update task
exports.updateTask = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || !Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    // Check if task exists
    const existingTask = await TaskModel.task(knex).select('*').where('id', id);
    if (existingTask.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const data = req.body; // For validation

    if (!data.title || !data.userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const validatedData = TaskValidator.taskSchema.parse(data);

    const updatedTask = await TaskModel.task(knex)
      .where('id', id)
      .update(validatedData)
      .returning('*');

    res.json(updatedTask[0]);
  } catch (error) {
    console.error(error);
    if (error.issues && error.issues.length > 0) {
      return res.status(400).json({ error: 'Validation failed', issues: error.issues });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

// DELETE task
exports.deleteTask = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || !Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    // Check if task exists
    const existingTask = await TaskModel.task(knex).select('*').where('id', id);
    if (existingTask.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const deleted = await TaskModel.task(knex).del(id);

    if (!deleted) {
      return res.status(500).json({ error: 'Failed to delete task' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const { z } = require('zod');
const ProductModel = require('../models/Product');
const ProductValidator = require('../models/ProductValidator');

// GET all products
exports.getAllProducts = async (req, res) => {
  try {
    const data = req.body; // For validation

    if (!data || !data.id) {
      return res.status(400).json({ error: 'Missing required field: id' });
    }

    const products = await ProductModel.product(knex).select('*').where('id', data.id);

    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(products[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET product by ID
exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || !Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const product = await ProductModel.product(knex).select('*').where('id', id);

    if (product.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST create product
exports.createProduct = async (req, res) => {
  try {
    const data = req.body; // For validation

    if (!data.name || !data.price || !data.category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const validatedData = ProductValidator.productSchema.parse(data);

    const product = await ProductModel.product(knex).insert(validatedData).returning('*');

    res.json(product[0]);
  } catch (error) {
    console.error(error);
    if (error.issues && error.issues.length > 0) {
      return res.status(400).json({ error: 'Validation failed', issues: error.issues });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PUT update product
exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || !Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    // Check if product exists
    const existingProduct = await ProductModel.product(knex).select('*').where('id', id);
    if (existingProduct.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const data = req.body; // For validation

    if (!data.name || !data.price || !data.category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const validatedData = ProductValidator.productSchema.parse(data);

    const updatedProduct = await ProductModel.product(knex)
      .where('id', id)
      .update(validatedData)
      .returning('*');

    res.json(updatedProduct[0]);
  } catch (error) {
    console.error(error);
    if (error.issues && error.issues.length > 0) {
      return res.status(400).json({ error: 'Validation failed', issues: error.issues });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

// DELETE product
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || !Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    // Check if product exists
    const existingProduct = await ProductModel.product(knex).select('*').where('id', id);
    if (existingProduct.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const deleted = await ProductModel.product(knex).del(id);

    if (!deleted) {
      return res.status(500).json({ error: 'Failed to delete product' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

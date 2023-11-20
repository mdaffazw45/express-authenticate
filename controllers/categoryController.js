const db = require('../models'); // Import your Sequelize models
const Category = db.Category;

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { type } = req.body;
    const newCategory = await Category.create({ type });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating category' });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: 'vehicle_category'
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching categories' });
  }
};


// Get a single category by ID
exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching category' });
  }
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRows] = await Category.update(req.body, {
      where: { id },
    });
    if (updatedRows === 0) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.status(200).json({ message: 'Category updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating category' });
  }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await Category.destroy({
      where: { id },
    });
    if (deletedRows === 0) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting category' });
  }
};

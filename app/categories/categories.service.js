const Category = require("../categories/categories.model");
const SubCategory = require("../subcategories/subcategories.model");

// Method to add a category
exports.addCategory = async (categoryData) => {
  try {
    const newCategory = await Category.create(categoryData);
    return newCategory;
  } catch (error) {
    throw error;
  }
};

exports.findCategoryByName = async (categoryName) => {
  try {
    return await Category.findOne({
      where: { name: categoryName },
      include: {
        model: SubCategory,
      },
    });
  } catch (error) {
    throw error;
  }
};

exports.getAllCategories = async () => {
  try {
    return await Category.findAll({
      include: {
        model: SubCategory,
      },
    });
  } catch (error) {
    throw error;
  }
};

exports.findCategoryById = async (categoryId) => {
  try {
    return await Category.findByPk(categoryId, {
      include: {
        model: SubCategory,
      },
    });
  } catch (error) {
    throw error;
  }
};

exports.updateCategory = async (categoryId, updateData) => {
  try {
    const category = await Category.findByPk(categoryId);
    if (category) {
      return await category.update(updateData);
    }
    return null;
  } catch (error) {
    throw error;
  }
};

exports.deleteCategory = async (categoryId) => {
  try {
    const category = await Category.findByPk(categoryId);
    if (category) {
      await category.destroy();
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

exports.deleteCategoryByName = async (categoryName) => {
  try {
    const category = await Category.findOne({
      where: { category: categoryName },
    });
    if (category) {
      await category.destroy();
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

exports.updateCategoryStatus = async (categoryId, status) => {
  try {
    const category = await Category.findByPk(categoryId);
    if (category) {
      return await category.update({ status });
    }
    return null;
  } catch (error) {
    throw error;
  }
};

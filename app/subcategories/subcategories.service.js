const SubCategory = require("./subcategories.model");

// Add SubCategory
exports.addSubCategory = async (subCategoryData) => {
  try {
    const newSubCategory = await SubCategory.create(subCategoryData);
    return newSubCategory;
  } catch (error) {
    throw error;
  }
};

// Find SubCategory by name and category ID
exports.findSubCategoryByName = async (name, categoryId) => {
  try {
    return await SubCategory.findOne({ where: { name, categoryId } });
  } catch (error) {
    throw error;
  }
};

// Get all SubCategories
exports.getAllSubCategories = async () => {
  try {
    return await SubCategory.findAll();
  } catch (error) {
    throw error;
  }
};

// Find SubCategory by ID
exports.findSubCategoryById = async (id) => {
  try {
    return await SubCategory.findByPk(id);
  } catch (error) {
    throw error;
  }
};

// Find SubCategories by Category ID
exports.findSubCategoriesByCategoryId = async (categoryId) => {
  try {
    return await SubCategory.findAll({ where: { categoryId } });
  } catch (error) {
    throw error;
  }
};

// Update SubCategory
exports.updateSubCategory = async (id, updateData) => {
  try {
    const subCategory = await SubCategory.findByPk(id);
    if (subCategory) {
      return await subCategory.update(updateData);
    }
    return null;
  } catch (error) {
    throw error;
  }
};

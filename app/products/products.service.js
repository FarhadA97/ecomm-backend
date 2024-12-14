const Product = require("./products.model");
const SubCategory = require("../subcategories/subcategories.model");
const { Op } = require("sequelize");

exports.addProduct = async (productData) => {
  return await Product.create(productData);
};

exports.findProductById = async (id) => {
  return await Product.findByPk(id);
};

exports.findProductsBySubCategoryId = async (subCategoryId) => {
  return await Product.findAll({ where: { subCategoryId } });
};

exports.findProductsByCategoryId = async (categoryId) => {
  return await Product.findAll({
    include: {
      model: SubCategory,
      where: { categoryId },
    },
  });
};

exports.getAllProducts = async () => {
  return await Product.findAll();
};
exports.getProductsPaginated = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;
    return await Product.findAndCountAll({
      offset,
      limit,
    });
  } catch (error) {
    throw error;
  }
};

exports.updateProduct = async (id, updateData) => {
  const product = await Product.findByPk(id);
  if (product) {
    return await product.update(updateData);
  }
  return null;
};

exports.searchProducts = async (searchTerm, page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;

    const result = await Product.findAndCountAll({
      where: {
        title: {
          [Op.like]: `%${searchTerm}%`,
        },
      },
      offset,
      limit,
    });

    return result;
  } catch (error) {
    throw error;
  }
};

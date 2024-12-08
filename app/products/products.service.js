const Product = require("./products.model");
const SubCategory = require("../subcategories/subcategories.model");

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

exports.updateProduct = async (id, updateData) => {
  const product = await Product.findByPk(id);
  if (product) {
    return await product.update(updateData);
  }
  return null;
};

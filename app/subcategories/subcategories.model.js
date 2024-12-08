const sequelize = require("../../configs/db-config");
const { DataTypes } = require("sequelize");
const Product = require("../products/products.model");

const SubCategory = sequelize.define("SubCategory", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  picture: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM("active", "inactive"),
    defaultValue: "active",
    allowNull: false,
  },
});

SubCategory.hasMany(Product, {
  foreignKey: "subCategoryId",
  onDelete: "CASCADE",
});
Product.belongsTo(SubCategory, { foreignKey: "subCategoryId" });

module.exports = SubCategory;

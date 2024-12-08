const sequelize = require("../../configs/db-config");
const { DataTypes } = require("sequelize");

// Import the SubCategory model for the association
const SubCategory = require("../subcategories/subcategories.model");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  subCategoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  material: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sizes: {
    type: DataTypes.STRING,
    defaultValue: "S / M / L / XL / 2XL / 3XL / 4XL / 5XL",
  },
  colorsCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  colors: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  images: {
    type: DataTypes.JSON,
  },
});

module.exports = Product;

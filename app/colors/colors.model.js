const sequelize = require("../../configs/db-config");
const { DataTypes } = require("sequelize");
const Product = require("../products/products.model");

const Color = sequelize.define("Color", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hexValue: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Color.hasMany(Product, {
//   foreignKey: "colorIds",
//   onDelete: "CASCADE",
// });
// Product.belongsTo(Color, { foreignKey: "colorIds" });

module.exports = Color;

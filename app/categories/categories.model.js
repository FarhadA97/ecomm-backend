const sequelize = require("../../configs/db-config");
const { DataTypes } = require("sequelize");
const SubCategory = require("../subcategories/subcategories.model");

const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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

Category.hasMany(SubCategory, {
  foreignKey: "categoryId",
  onDelete: "CASCADE",
});
SubCategory.belongsTo(Category, { foreignKey: "categoryId" });

module.exports = Category;

const Color = require("./colors.model");

exports.addColor = async (data) => {
  const { id, name, hexValue } = data;
  return await Color.create({ id, name, hexValue });
};

// Update a color
exports.updateColor = async (id, data) => {
  const color = await Color.findByPk(id);
  if (!color) {
    throw new Error("Color not found");
  }
  return await color.update(data);
};

// Delete a color
exports.deleteColor = async (id) => {
  const color = await Color.findByPk(id);
  if (!color) {
    throw new Error("Color not found");
  }
  await color.destroy();
  return { message: "Color deleted successfully" };
};

exports.getColorById = async (id) => {
  return await Color.findByPk(id);
};

exports.getColors = async () => {
  return await Color.findAll();
};

exports.getColorsByIds = async (colorIds) => {
  return await Color.findAll({
    where: {
      id: {
        [Op.in]: colorIds,
      },
    },
  });
};

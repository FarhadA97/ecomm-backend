const colorService = require("./colors.service");

exports.addColor = async (req, res) => {
  try {
    const { id, name, hexValue } = req.body;

    if (!name || !hexValue) {
      return res.status(400).json({ error: "Name and hexValue are required" });
    }

    const newColor = await colorService.addColor({ id, name, hexValue });
    res.status(201).json({
      status: true,
      message: "Color Added Succesfully",
      color: newColor,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateColor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, hexValue } = req.body;

    const updatedColor = await colorService.updateColor(id, { name, hexValue });
    res.status(200).json(updatedColor);
  } catch (error) {
    res
      .status(error.message === "Color not found" ? 404 : 500)
      .json({ error: error.message });
  }
};

exports.deleteColor = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await colorService.deleteColor(id);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(error.message === "Color not found" ? 404 : 500)
      .json({ error: error.message });
  }
};

exports.getColors = async (req, res) => {
  try {
    const { id } = req.query;

    if (id) {
      const color = await colorService.getColorById(id);

      if (!color) {
        return res.status(404).json({ error: "Color not found" });
      }

      res.status(200).json(color);
    } else {
      const colors = await colorService.getColors();
      res.status(200).json(colors);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

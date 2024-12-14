const express = require("express");
const router = express.Router();
const colorController = require("./colors.controller");

router.post("/addColor", colorController.addColor);

router.put("/updateColor/:id", colorController.updateColor);

router.delete("/deleteColor/:id", colorController.deleteColor);

router.get("/getColor/:id", colorController.getColors);

module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const subCategoryController = require("./subcategories.controller");

router.post(
  "/addSubCategory",
  upload.fields([{ name: "picture", maxCount: 1 }]),
  subCategoryController.addSubCategory
);

router.get("/getSubCategory", subCategoryController.getSubCategory);

router.put(
  "/updateSubCategory",
  upload.fields([{ name: "picture", maxCount: 1 }]),
  subCategoryController.updateSubCategory
);

module.exports = router;

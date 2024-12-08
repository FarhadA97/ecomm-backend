const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const categoryController = require("../categories/categories.controller");

router.post(
  "/addCategory",
  upload.fields([{ name: "picture", maxCount: 1 }]),
  categoryController.addCategory
);
router.get("/getCategory", categoryController.getCategory);
router.put(
  "/editCategory",
  upload.fields([{ name: "picture", maxCount: 1 }]),
  categoryController.editCategory
);
router.put("/setStatus", categoryController.setCategoryStatus);

// router.delete("/deleteCategory/:categoryId", categoryController.deleteCategory);
// router.delete(
//   "/deleteCategory/:categoryName",
//   categoryController.deleteCategoryByName
// );

module.exports = router;

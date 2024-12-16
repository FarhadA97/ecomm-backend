const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const productController = require("./products.controller");

router.post(
  "/addProduct",
  upload.fields([{ name: "pictures", maxCount: 5 }]),
  productController.addProduct
);

router.get("/getProduct", productController.getProduct);
router.get("/getAllProducts", productController.getAllProducts);

router.put(
  "/updateProduct",
  upload.fields([{ name: "pictures", maxCount: 5 }]),
  productController.updateProduct
);

router.get("/searchProducts", productController.searchProducts);
router.get("/landingPageProducts", productController.getLandingPageProducts);

module.exports = router;

const productService = require("./products.service");
const { uploadToCloudinary } = require("../../utils");

exports.addProduct = async (req, res) => {
  try {
    const {
      id,
      subCategoryId,
      title,
      description,
      material,
      sizes,
      colorsCode,
      colors,
      price,
    } = req.body;

    if (!id || !subCategoryId || !title || !price) {
      return res.status(400).json({
        status: false,
        message: "Missing required fields: id, subCategoryId, title, or price.",
      });
    }

    let pictureUrls = [];
    if (req.files && req.files.pictures) {
      const uploadPromises = req.files.pictures.map((file) =>
        uploadToCloudinary(file, "product_images")
      );
      pictureUrls = await Promise.all(uploadPromises);
    }

    const newProduct = await productService.addProduct({
      id,
      subCategoryId,
      title,
      description: JSON.parse(description),
      material,
      sizes,
      colorsCode,
      colors,
      price,
      images: pictureUrls,
    });

    res.status(201).json({
      status: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Failed to add product",
      error: error.message,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id, subCategoryId, categoryId } = req.query;

    let products;
    if (id) {
      products = await productService.findProductById(id);
    } else if (subCategoryId) {
      products = await productService.findProductsBySubCategoryId(
        subCategoryId
      );
    } else if (categoryId) {
      products = await productService.findProductsByCategoryId(categoryId);
    } else {
      products = await productService.getAllProducts();
    }

    res.status(200).json({
      status: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const products = await productService.getProductsPaginated(
      Number(page),
      Number(limit)
    );

    res.status(200).json({
      status: true,
      message: "Products fetched successfully",
      data: {
        total: products.count,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(products.count / limit),
        products: products.rows,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Could not fetch products",
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Product ID is required for update",
      });
    }

    const updateData = { ...req.body };

    if (req.files && req.files.pictures) {
      const uploadPromises = req.files.pictures.map((file) =>
        uploadToCloudinary(file, "product_images")
      );
      updateData.images = await Promise.all(uploadPromises);
    }

    if (req.body.description) {
      updateData.description = JSON.parse(req.body.description);
    }

    const updatedProduct = await productService.updateProduct(id, updateData);

    if (!updatedProduct) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { searchTerm, page = 1, limit = 10 } = req.query;

    if (!searchTerm) {
      return res.status(400).json({
        status: false,
        message: "Search term is required",
      });
    }

    const products = await productService.searchProducts(
      searchTerm,
      Number(page),
      Number(limit)
    );

    res.status(200).json({
      status: true,
      message: "Products fetched successfully",
      data: {
        total: products.count,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(products.count / limit),
        products: products.rows,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Could not search products",
      error: error.message,
    });
  }
};

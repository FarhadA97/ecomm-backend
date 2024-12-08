const categoryService = require("../categories/categories.service");
const { uploadToCloudinary } = require("../../utils");

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const picture = req.files.picture;

    if (!name) {
      return res
        .status(400)
        .json({ status: false, message: "Category name is required" });
    }

    const existingCategory = await categoryService.findCategoryByName(name);
    if (existingCategory) {
      return res
        .status(400)
        .json({ status: false, message: "Category already exists" });
    }

    let categoryPicUrl;
    if (picture) {
      categoryPicUrl = await uploadToCloudinary(picture[0], "category_pic");
    }
    // console.log("category url", categoryPicUrl);
    const newCategory = await categoryService.addCategory({
      name,
      picture: categoryPicUrl,
    });

    res.status(201).json({
      status: true,
      message: "Category added successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Could not add category",
      error: error.message,
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const { id, name } = req.query;

    let category;
    if (id) {
      category = await categoryService.findCategoryById(id);
      if (!category) {
        return res
          .status(404)
          .json({ status: false, message: "Category not found" });
      }
      res.status(200).json({
        status: true,
        message: "Category fetched successfully",
        category,
      });
    } else if (name) {
      category = await categoryService.findCategoryByName(name);
      if (!category) {
        return res
          .status(404)
          .json({ status: false, message: "Category not found" });
      }
      res.status(200).json({
        status: true,
        message: "Category fetched successfully",
        category,
      });
    } else {
      const categories = await categoryService.getAllCategories();
      res.status(200).json({
        status: true,
        message: "Categories fetched successfully",
        categories,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Could not fetch categories",
      error: error.message,
    });
  }
};

// Edit category
exports.editCategory = async (req, res) => {
  try {
    const { id } = req.query;
    const { name } = req.body;
    const picture = req.files ? req.files.picture : null;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Category ID is required",
      });
    }

    // Build the update data with optional fields
    const updateData = { name };
    if (picture) {
      updateData.picture = await uploadToCloudinary(picture[0], "category_pic");
    }

    const updatedCategory = await categoryService.updateCategory(
      id,
      updateData
    );

    if (updatedCategory) {
      res.status(200).json({
        status: true,
        message: "Category updated successfully",
        category: updatedCategory,
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Could not update category",
      error: error.message,
    });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const isDeleted = await categoryService.deleteCategory(categoryId);

    if (isDeleted) {
      res.status(200).json({
        status: true,
        message: "Category deleted successfully",
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Could not delete category",
      error: error.message,
    });
  }
};

exports.deleteCategoryByName = async (req, res) => {
  try {
    const { categoryName } = req.params;

    const isDeleted = await categoryService.deleteCategoryByName(categoryName);

    if (isDeleted) {
      res.status(200).json({
        status: true,
        message: "Category deleted successfully",
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Could not delete category",
      error: error.message,
    });
  }
};

exports.setCategoryStatus = async (req, res) => {
  try {
    const { id } = req.query;
    const { status } = req.body;

    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({
        status: false,
        message: "Invalid status. Allowed values are 'active' and 'inactive'.",
      });
    }

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Category ID is required",
      });
    }

    const updatedCategory = await categoryService.updateCategoryStatus(
      id,
      status
    );

    if (updatedCategory) {
      res.status(200).json({
        status: true,
        message: `Category status updated to ${status} successfully`,
        category: updatedCategory,
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Could not update category status",
      error: error.message,
    });
  }
};

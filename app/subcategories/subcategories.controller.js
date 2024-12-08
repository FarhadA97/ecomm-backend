const subCategoryService = require("../subcategories/subcategories.service");
const { uploadToCloudinary } = require("../../utils");

// Add SubCategory
exports.addSubCategory = async (req, res) => {
  try {
    const { categoryId, name } = req.body;
    const picture = req.files ? req.files.picture : null;

    if (!categoryId || !name) {
      return res.status(400).json({
        status: false,
        message: "Category ID and Subcategory name are required",
      });
    }

    const existingSubCategory = await subCategoryService.findSubCategoryByName(
      name,
      categoryId
    );

    if (existingSubCategory) {
      return res.status(400).json({
        status: false,
        message: "Subcategory already exists under this category",
      });
    }

    let subCategoryPicUrl;
    if (picture) {
      subCategoryPicUrl = await uploadToCloudinary(
        picture[0],
        "subcategory_pic"
      );
    }

    const newSubCategory = await subCategoryService.addSubCategory({
      categoryId,
      name,
      picture: subCategoryPicUrl,
    });

    res.status(201).json({
      status: true,
      message: "Subcategory added successfully",
      subCategory: newSubCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Could not add subcategory",
      error: error.message,
    });
  }
};

// Get SubCategory
exports.getSubCategory = async (req, res) => {
  try {
    const { id, categoryId } = req.query;

    if (id) {
      const subCategory = await subCategoryService.findSubCategoryById(id);
      if (!subCategory) {
        return res.status(404).json({
          status: false,
          message: "Subcategory not found",
        });
      }
      return res.status(200).json({
        status: true,
        message: "Subcategory fetched successfully",
        subCategory,
      });
    }

    if (categoryId) {
      const subCategories =
        await subCategoryService.findSubCategoriesByCategoryId(categoryId);
      return res.status(200).json({
        status: true,
        message: "Subcategories fetched successfully",
        subCategories,
      });
    }

    const allSubCategories = await subCategoryService.getAllSubCategories();
    res.status(200).json({
      status: true,
      message: "All subcategories fetched successfully",
      subCategories: allSubCategories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Could not fetch subcategories",
      error: error.message,
    });
  }
};

// Update SubCategory
exports.updateSubCategory = async (req, res) => {
  try {
    const { id } = req.query;
    const { name, categoryId } = req.body;
    const picture = req.files ? req.files.picture : null;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Subcategory ID is required",
      });
    }

    const updateData = { name, categoryId };
    if (picture) {
      updateData.picture = await uploadToCloudinary(
        picture[0],
        "subcategory_pic"
      );
    }

    const updatedSubCategory = await subCategoryService.updateSubCategory(
      id,
      updateData
    );

    if (updatedSubCategory) {
      res.status(200).json({
        status: true,
        message: "Subcategory updated successfully",
        subCategory: updatedSubCategory,
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Subcategory not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Could not update subcategory",
      error: error.message,
    });
  }
};

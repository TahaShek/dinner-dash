const { Category } = require("../models");

const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json({
      message: "Category created successfully",
      data: category._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find({});
    res.status(200).json({ data: category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "Updated category successfully",
      data: updatedCategory._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    res.status(200).json({ message: "category  deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createCategory,
  getAllCategory,
  deleteCategory,
  updateCategory,
};

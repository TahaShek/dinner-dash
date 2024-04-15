const { Items } = require("../models");

const createItem = async (req, res) => {
  try {
    const { title, description, price, quantity, category } = req.body;

    const item = await Items.create({
      title,
      description,
      price,
      quantity,
      category,
    });
    res.status(200).json({ message: "Item created successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllItems = async (req, res) => {
  try {
    const items = await Items.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Items.findById(id);
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getItemByCategory = async (req, res) => {
  try {
    const catergoryId = req.params.categoryId;
    const items = await Items.find({ category: catergoryId }).populate(
      "category",
      "title"
    );
    res.status(200).json({ data: items });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, quantity, category } = req.body;

    const updatedItem = await Items.findByIdAndUpdate(
      id,
      { title, description, price, quantity, category },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Item updated successfully", data: updatedItem });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await Items.findByIdAndDelete({ id });
    res.status(200).json({ message: "item deleted sucessfully " });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeItemFromCategory = async (req, res) => {
  try {
    const { itemId } = req.params;

    const updatedItem = await Items.findByIdAndUpdate(
      itemId,
      { category: null },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Item removed from category", data: updatedItem });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createItem,
  updateItem,
  getItemById,
  getAllItems,
  getItemByCategory,
  deleteItem,
  removeItemFromCategory,
};

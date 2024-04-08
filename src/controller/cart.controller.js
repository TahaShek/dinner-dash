const { cart, Items } = require("../models");

const calculateCartTotalPrice = async (items) => {
  let totalPrice = 0;
  for (const item of items) {
    const itemDocument = await Items.findById(item.itemId);

    totalPrice += itemDocument.price * item.quantity;
  }
  return totalPrice;
};

const createCart = async (req, res) => {
  try {
    const { userId, items } = req.body;

    const totalPrice = await calculateCartTotalPrice(items);

    const newCart = await cart.create({ userId, items, totalPrice });

    res
      .status(200)
      .json({ message: "Cart created successfully", data: newCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCarts = async (req, res) => {
  try {
    const carts = await cart.find();

    res.status(200).json({ data: carts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, items } = req.body;

    const updatedCart = await cart.findByIdAndUpdate(
      id,
      { userId, items },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res
      .status(200)
      .json({ message: "Cart updated successfully", data: updatedCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;

    await cart.findByIdAndDelete(id);

    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createCart, getAllCarts, updateCart, deleteCart };

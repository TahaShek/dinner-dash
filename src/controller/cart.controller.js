const { cart, Items, Order } = require("../models");

const calculateCartTotalPrice = async (items) => {
  let totalPrice = 0;
  for (const item of items) {
    const itemDocument = await Items.findById(item.itemId);

    if (itemDocument) {
      totalPrice += itemDocument.price * item.quantity;
    }
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
    const carts = await cart.find().populate({
      path: "items.itemId",
      select: "title",
    });

    res.status(200).json({ data: carts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { items } = req.body;

    const totalPrice = await calculateCartTotalPrice(items);

    let updatedCart = await cart.findById(id);

    updatedCart.items = items;
    updatedCart.totalPrice = totalPrice;
    const allQuantities = items.every((item) => item.quantity === 0);
    if (allQuantities) {
      await cart.findByIdAndDelete(id);
      return res.status(200).json({ message: "Cart deleted successfully" });
    }

    updatedCart = await updatedCart.save();

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

const createOrder = async (req, res) => {
  try {
    const { cartId } = req.body;
    const cartDetails = await cart.findById(cartId);
    const order = await Order.create({
      items: cartDetails.items,
      totalPrice: cartDetails.totalPrice,
    });
    for (const item of cartDetails.items) {
      const updatedItem = await Items.findByIdAndUpdate(
        item.itemId,
        {
          $inc: { quantity: -item.quantity },
        },
        { new: true }
      );
    }
    await cart.findByIdAndDelete(cartDetails._id);

    res.status(200).json({
      data: order,
      message: "Order created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderByid = async (req, res) => {
  try {
    const { id } = req.params;
    const orderById = await Order.findById(id);
    res.status(200).json({ data: orderById });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const allOrder = await Order.find({});
    res.status(200).json({
      data: allOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.status(200).json({
      message: "Order has been canceled",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const udpateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const status = req.body;
    const order = await Order.findByIdAndUpdate;
    id, { status }, { new: true };
    res.status(200).send({
      success: true,
      message: "Order Status Updated",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createCart,
  getAllCarts,
  updateCart,
  deleteCart,
  createOrder,
  getAllCarts,
  getOrderByid,
  getAllOrder,
  cancelOrder,
};

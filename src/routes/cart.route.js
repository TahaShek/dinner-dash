const express = require("express");
const router = express.Router();
const adminMidlleware=require('../middlewares/admin.middleware')
const { cartController } = require("../controller");
router.get("/", cartController.getAllCarts);
router.post("/order",adminMidlleware, cartController.createOrder);
router.get("/order/:id", cartController.getOrderByid);
router.get("/order", cartController.getAllOrder);

router.post("/", cartController.createCart);
router.put("/:id", cartController.updateCart);
router.delete("/:id", cartController.deleteCart);
router.delete("/order/:id", cartController.cancelOrder);

module.exports = router;

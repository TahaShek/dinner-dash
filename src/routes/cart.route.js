const express = require("express");
const router = express.Router();
const {cartController} = require("../controller");
router.get("/", cartController.getAllCarts);
router.post("/", cartController.createCart);
router.put("/:id", cartController.updateCart);
router.delete("/:id", cartController.deleteCart);

module.exports = router;

const express = require("express");
const router = express.Router();
const { itemsController } = require("../controller");

router.post("/create-item", itemsController.createItem);
router.get("/get-item/:categoryId", itemsController.getItemByCategory);
router.get("/get-all-items", itemsController.getAllItems);
router.get("/get-item-by-id/:id", itemsController.getItemById);
router.put("/update-item/:id", itemsController.updateItem);
router.delete("/delete-item/:id", itemsController.deleteItem);
router.put(
  "/remove-item-from-category/:itemId",
  itemsController.removeItemFromCategory
);

module.exports = router;

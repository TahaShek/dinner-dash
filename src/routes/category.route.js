const express = require("express");
const router = express.Router();
const { categoriesController } = require("../controller");
const { jwtTokenVerify } = require("../middlewares/jwt.middleware");
const {
  categoryValidationRules,
  validate,
} = require("../middlewares/category.middleware");

router.post(
  "/category",
  categoryValidationRules(),
  validate,
  categoriesController.createCategory
);
router.get("/category", jwtTokenVerify, categoriesController.getAllCategory);
router.put(
  "/category/:id",
  categoryValidationRules(),
  validate,
  categoriesController.updateCategory
);
router.delete("/category/:id", categoriesController.deleteCategory);

module.exports = router;

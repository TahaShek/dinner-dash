const { Category } = require("../models");

const { body, validationResult } = require("express-validator");

const categoryValidationRules = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("Title is required")
      .isAlpha()
      .withMessage("Title must contain only alphabets")
      .trim(),
  ];
};

const validate = async (req, res, next) => {
  try {
    const { title } = req.body;
    const existingCategory = await Category.findOne({ title });

    if (req.method === "GET") {
      const categories = await Category.find({});
      if (categories.length === 0) {
        return res
          .status(200)
          .json({ data: null, message: "no category found" });
      }
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    if (existingCategory) {
      return res
        .status(400)
        .json({ success: false, message: "Category already exists" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }

  next();
};

module.exports = { categoryValidationRules, validate };

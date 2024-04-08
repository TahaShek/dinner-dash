const { User } = require("../models");
const jwt = require("jsonwebtoken");

const { body, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [
    body("name").isEmpty().withMessage("name is required").trim(),

    body("email").isEmail().withMessage("enter valid email").trim(),

    body("password").isLength({ min: 5 }),
  ];
};

const validate = async (req, res, next) => {
  const { email } = req.body;
  const alreadyExists = await User.findOne({ email: email });
  if (alreadyExists) {
    return res.json({
      message: "Already exists",
    });
  }
  if (!email) {
    return res.json({
      message: "enter email",
    });
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

const loginMiddleware = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const userPassword = String(password);

  const isValidPassword = await user.comparePassword(userPassword);
  if (!isValidPassword) {
    return res.status(400).json({ message: "Incorrect password" });
  }
  const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: "1h" });
  // Attach token to request object for future use (optional)
  req.token = token;
  next();
};

module.exports = {
  userValidationRules,
  validate,
  loginMiddleware,
};

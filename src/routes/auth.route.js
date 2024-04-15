const express = require("express");
const router = express.Router();
const { authController } = require("../controller");
const {
  userValidationRules,
  validate,
  loginMiddleware,
} = require("../middlewares/auth.middleware");
const { jwtTokenVerify } = require("../middlewares/jwt.middleware");

router.post(
  "/self-register",
  userValidationRules(),
  validate,
  authController.resgisterUser
);
router.get("/login", loginMiddleware, authController.login);
module.exports = router;

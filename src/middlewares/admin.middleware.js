const { User } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);

    if (user.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Only Admin Access",
      });
    }

    next();
  } catch (error) {
    console.error("Middleware error:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

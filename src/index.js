const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const app = express();
const { connectDB } = require("./db/index");
const port = process.env.PORT || 2000;
const rroutes = require("./routes");

app.use(express.json());
app.use("/auth", routes.authRoutes);
app.use("/food", routes.categoryRoutes);
app.use("/items", routes.itemsRoutes);
app.use("/cart", routes.cartRoutes);

app.listen(port, () => {
  console.log("Listening on port " + port);
});
connectDB();

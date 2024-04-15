const mongoose = require("mongoose");
const imageScheema = mongoose.Schema({
  filename: String,
  path: String,
  createdAt: { type: Date, default: Date.now },
});

const imageModel=mongoose.model('Image',imageScheema);
module.exports=imageModel

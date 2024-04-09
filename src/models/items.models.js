const mongoose = require("mongoose");
const itemsSchemma = mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      lowercase: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    itemStatus: {
      type: String,
      required: true,
      default: "available",
      enum: ["retired", "available"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  {
    timestamps: true,
  }
);
const itemModel = mongoose.model("Item", itemsSchemma);
module.exports = itemModel;

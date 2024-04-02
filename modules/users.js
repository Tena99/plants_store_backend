const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  imageUrl: {
    type: String,
  },
  nickname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  cart: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      amount: {
        type: Number,
        default: 1,
      },
      discount: {
        type: Number,
        default: 0,
      },
    },
  ],
  reviews: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      message: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  wishlist: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    },
  ],
  language: {
    type: String,
    enum: ["EN", "DE"],
    default: "EN",
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;

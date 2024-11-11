const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    size: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    userId: { type: String, required: true },
    productId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("CartSchema", cartSchema);
module.exports = Cart;

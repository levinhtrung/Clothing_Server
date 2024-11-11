const mongoose = require("mongoose");
// const slug = require('mongoose-slug-generator')
// const slug = require('mongoose-slug-updater');
// const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    orderItems: [
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
    ],
    shippingAddres: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      // city: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },

    paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    // taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    DeliveryStatus: { type: String, default: "NOT" },
    deliveredAt: { type: String },
  },
  {
    timestamps: true,
  }
);

// Add plugins
// mongoose.plugin(slug);
// UserSchema.plugin(mongooseDelete, {
//     deletedAt: true,
//     overrideMethods: 'all',
// });
//{ overrideMethods: 'all' } là không hiển thị tất cả các database có deleted: true

//unique: true: chỉ tồn tại duy nhất 1 cái, tránh trùng slug khi đặt trùng name

const Order = mongoose.model("OrderSchema", orderSchema);
module.exports = Order;

const mongoose = require("mongoose");
// const slug = require('mongoose-slug-generator')
// const slug = require('mongoose-slug-updater');
// const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    //   author: ObjectId,
    name: { type: String, required: true },
    image: { type: String, required: true },
    imageDetails: {
      image1: { type: String },
      image2: { type: String },
      image3: { type: String },
    },
    gender: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: {
      sizeS: { type: Number },
      sizeM: { type: Number },
      sizeL: { type: Number },
      sizeXL: { type: Number },
      sizeXXL: { type: Number },
      size28: { type: Number },
      size29: { type: Number },
      size30: { type: Number },
      size31: { type: Number },
      size32: { type: Number },
      size33: { type: Number },
      size34: { type: Number },
      size35: { type: Number },
      size36: { type: Number },
    },
    countInStock: { type: Number },
    rating: { type: Number },
    description: { type: String },
    discount: { type: Number },
    selled: { type: Number, default: 0 },
    age: { type: String, required: true },
    size: { type: String, required: true },
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

const Prosuct = mongoose.model("ProductSchema", productSchema);
module.exports = Prosuct;

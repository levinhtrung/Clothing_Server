const Cart = require("../models/CartModel");

const createCart = (userId, data) => {
  return new Promise(async (resolve, reject) => {
    const { name, amount, size, image, price, productId, type } = data;
    try {
      const checkCart = await Cart.findOne({
        userId: userId,
        productId: productId,
        size: size,
      });
      if (checkCart !== null) {
        const dataUpdate = {
          amount: amount + checkCart.amount,
        };
        const updateCart = await Cart.findByIdAndUpdate(
          checkCart._id,
          dataUpdate,
          {
            new: true,
          }
        );

        resolve({
          status: "OK",
          message: "SUCCESS",
          updateCart,
        });
      } else {
        const createCart = await Cart.create({
          name,
          amount,
          size,
          image,
          price,
          type,
          userId,
          productId,
        });
        if (createCart) {
          resolve({
            status: "OK",
            message: "SUCCESS",
            data: createCart,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateCart = (productId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkCart = await Cart.findOne({
        productId: productId,
      });
      console.log('check cart', checkCart)
      if (checkCart === null) {
        resolve({
          status: "ERR",
          message: "The cart is not defined",
        });
      }

      const updateCart = await Cart.findByIdAndUpdate(checkCart._id, data, {
        new: true,
      });

      resolve({
        status: "OK",
        message: "SUCCESS",
        updateCart,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllCart = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cart = await Cart.find({
        userId: id,
      }).sort({ createdAt: -1, updatedAt: -1 });
      if (cart === null) {
        resolve({
          status: "ERR",
          message: "The cart is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCESSS",
        data: cart,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteCartDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkCart = await Cart.findOne({
        _id: id,
      });
      if (checkCart === null) {
        resolve({
          status: "ERR",
          message: "The cart is not defined",
        });
      }
      await Cart.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "DELETE PRODUCT SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUpdateCart = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      ids.map(async (id) => {
        const checkCart = await Cart.findOne({
          productId: id,
        });
        if(checkCart) {
          await Cart.findByIdAndDelete(checkCart._id);
          resolve({
            status: "OK",
            message: "DELETE UPDATE PRODUCT SUCCESS",
          });
        } else {
          resolve({
            message: "Cart không có trùng vs product đã xoá",
          });
        }
      })
    } catch (e) {
      console.log("loi", e);
    }
  });
};

const deleteManyCart = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Cart.deleteMany({ _id: ids });
      resolve({
        status: "OK",
        message: "DELETE MANY PRODUCT SUCCESS",
      });
    } catch (e) {
      console.log("loi", e);
    }
  });
};

module.exports = {
  createCart,
  updateCart,
  getAllCart,
  deleteCartDetails,
  deleteManyCart,
  deleteUpdateCart
};

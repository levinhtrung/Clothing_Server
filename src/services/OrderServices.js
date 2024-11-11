const Order = require("../models/OrderProduct");
const Product = require("../models/ProductModel");
const EmailServices = require("./EmailServices");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

const createOrder = (userId, newOrder) => {
  return new Promise(async (resolve, reject) => {
    const {
      orderItems,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullName,
      address,
      phone,
      isPaid,
      paidAt,
      email,
      deliveredAt,
    } = newOrder;
    try {
      const promises = orderItems?.map(async (order) => {
        const quantityProperty = `quantity.size${order?.size}`;
        const productData = await Product.findOneAndUpdate(
          {
            _id: order?.productId,
            [quantityProperty]: { $gte: order?.amount }, //ktra xem còn đủ sl không
          },
          { new: true } //trả về dữ liệu mới sau khi cập nhật
        );
        if (productData) {
          // if (createOrder) {
          return {
            status: "OK",
            message: "SUCCESS",
          };
          // }
        } else {
          return {
            status: "ERR",
            message: "Không có đủ sản phẩm",
            id: order?.productId,
            name: order?.name,
          };
        }
      });
      const results = await Promise.all(promises);
      const newData = results.filter((item) => item.id);
      if (newData.length) {
        const arrId = [];
        newData.forEach((item) => {
          arrId.push(item.name);
        });
        resolve({
          status: "ERR",
          message: `Sản phẩm ${arrId.join(",")} không đủ hàng`,
        });
      } else {
        const createOrder = await Order.create({
          orderItems,
          shippingAddres: {
            fullName,
            phone,
            address,
            email,
          },
          paymentMethod,
          itemsPrice,
          shippingPrice,
          totalPrice,
          user: userId,
          isPaid,
          paidAt,
          deliveredAt,
        });
        if (createOrder) {
          orderItems?.map(async (order) => {
            const quantityProperty = `quantity.size${order?.size}`;
            await Product.findOneAndUpdate(
              {
                _id: order?.productId,
                [quantityProperty]: { $gte: order?.amount }, //ktra xem còn đủ sl không
              },
              {
                $inc: {
                  [quantityProperty]: -order?.amount, //cập nhật lại sl size
                  selled: +order?.amount, //cập nhật lại sl đã bán
                },
              },
              { new: true } //trả về dữ liệu mới sau khi cập nhật
            );
          });
          await EmailServices.sendEmailCreateOrder(
            email,
            orderItems,
            totalPrice,
            shippingPrice
          );
          resolve({
            status: "OK",
            message: "success",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllOrderDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.find({
        user: id,
      }).sort({ createdAt: -1, updatedAt: -1 });
      if (order === null) {
        resolve({
          status: "ERR",
          message: "The order is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCESSS",
        data: order,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getOrderDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findById({
        _id: id,
      });
      if (order === null) {
        resolve({
          status: "ERR",
          message: "The order is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCESSS",
        data: order,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const cancelOrderDetails = (id, data) => {
  let check = 1;
  return new Promise(async (resolve, reject) => {
    try {
      let order = [];
      const promises = data.map(async (order) => {
        const quantityProperty = `quantity.size${order?.size}`;
        const productData = await Product.findOneAndUpdate(
          {
            _id: order?.productId,
            selled: { $gte: order.amount },
          },
          {
            $inc: {
              [quantityProperty]: +order.amount,
              selled: -order.amount,
            },
          },
          { new: true }
        );
        if (check === 1) {
          if (productData) {
            check = 2;
            order = await Order.findByIdAndDelete(id);
            if (order === null) {
              resolve({
                status: "ERR",
                message: "The order is not defined",
              });
            }
          } else {
            return {
              status: "OK",
              message: "ERR",
              id: order.id,
            };
          }
        }
      });
      const results = await Promise.all(promises);
      const newData = results && results[0] && results[0].id;

      if (newData) {
        resolve({
          status: "ERR",
          message: `San pham voi id: ${newData} khong ton tai`,
        });
      }
      resolve({
        status: "OK",
        message: "success",
        data: order,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllOrder = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allOrder = await Order.find().sort({
        createdAt: -1,
        updatedAt: -1,
      });
      resolve({
        status: "OK",
        message: "Success",
        data: allOrder,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createOrder,
  getAllOrderDetails,
  getOrderDetails,
  cancelOrderDetails,
  getAllOrder,
};

const OrderServices = require("../services/OrderServices");
const JwtService = require("../services/JwtService");

const createOrder = async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullName,
      address,
      phone,
    } = req.body;
    if (
      !paymentMethod ||
      !itemsPrice ||
      !(Number(shippingPrice) >= 0) ||
      !totalPrice ||
      !fullName ||
      !address ||
      !phone
    ) {
      return res.status(404).json({
        status: "ERR",
        message: "The input is requireddd",
      });
    }
    const response = await OrderServices.createOrder(userId, req.body);
    if (response?.status === "OK") {
      return res.status(200).json(response);
    } else {
      return res.status(404).json(response);
    }
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllOrderDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const response = await OrderServices.getAllOrderDetails(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: "ERR 1",
    });
  }
};

const getDetailsOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    if (!orderId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const response = await OrderServices.getOrderDetails(orderId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const cancelOrderDetails = async (req, res) => {
  try {
    const data = req.body.orderItems;
    const orderId = req.body.orderId;
    if (!orderId) {
      return res.status(200).json({
        status: "ERR",
        message: "The orderId is required",
      });
    }
    const response = await OrderServices.cancelOrderDetails(orderId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      status: "ERR",
      message: "The err",
    });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const data = await OrderServices.getAllOrder();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrderDetails,
  getDetailsOrder,
  cancelOrderDetails,
  getAllOrder,
};

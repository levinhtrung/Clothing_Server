const CartServices = require("../services/CartServices");

const createCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, amount, size, image, price, productId, type } = req.body;
    if (!name || !amount || !size || !image || !price || !productId || !type) {
      return res.status(404).json({
        status: "ERR",
        message: "The input is requireddd",
      });
    }
    const response = await CartServices.createCart(userId, req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: "loiloi",
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }
    const response = await CartServices.updateCart(productId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: "loiupdate cart",
    });
  }
};

const getAllCart = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const response = await CartServices.getAllCart(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: "ERR Cart",
    });
  }
};

const deleteCartDetails = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    if (!cartId) {
      return es.status(404).json({
        status: "ERR",
        message: "The cartId is required",
      });
    }
    const response = await CartServices.deleteCartDetails(cartId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: "loi day",
    });
  }
};

const deleteUpdateCart = async (req, res) => {
  try {
    const ids = req.body.ids;
    if (!ids) {
      return res.status(200).json({
        status: "ERR",
        message: "The cartId is required",
      });
    }
    const response = await CartServices.deleteUpdateCart(ids);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteManyCart = async (req, res) => {
  try {
    const ids = req.body.ids;
    if (!ids) {
      return res.status(200).json({
        status: "ERR",
        message: "The ids is required",
      });
    }
    const response = await CartServices.deleteManyCart(ids);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createCart,
  updateCart,
  getAllCart,
  deleteCartDetails,
  deleteManyCart,
  deleteUpdateCart,
};

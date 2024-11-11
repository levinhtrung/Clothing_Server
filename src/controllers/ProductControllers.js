const ProductServices = require("../services/ProductServices");
const JwtService = require("../services/JwtService");

const createProduct = async (req, res) => {
  try {
    const { name, image, gender, price, age, size, type, imageDetails } =
      req.body;
    if (
      !name ||
      !image ||
      !gender ||
      !price ||
      !age ||
      !size ||
      !type ||
      !imageDetails?.image1 ||
      !imageDetails?.image2 ||
      !imageDetails?.image3
    ) {
      return res.status(404).json({
        status: "ERR",
        message: "The input is requireddd",
      });
    }
    const response = await ProductServices.createProduct(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: "loicreate",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }
    const response = await ProductServices.updateProduct(productId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: "loiupdate",
    });
  }
};

const getdetailsProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }
    const response = await ProductServices.getDetailsProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: "ERR",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }
    const response = await ProductServices.deleteProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteManyProduct = async (req, res) => {
  try {
    const ids = req.body.ids; //mang id
    if (!ids) {
      return res.status(200).json({
        status: "ERR",
        message: "The ids is required",
      });
    }
    const response = await ProductServices.deleteManyProduct(ids);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllProductSearch = async (req, res) => {
  try {
    const { limit, filter } = req.query;
    const response = await ProductServices.getAllProductSearch(+limit, filter);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllProductType = async (req, res) => {
  try {
    const { limit, page, filter } = req.query;
    const response = await ProductServices.getAllProductType(
      +limit,
      +page,
      filter
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllProductPropose = async (req, res) => {
  try {
    const { limit, filter } = req.query;
    const response = await ProductServices.getAllProductPropose(+limit, filter);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const { limit } = req.query;
    const response = await ProductServices.getAllProduct(+limit);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllType = async (req, res) => {
  try {
    const response = await ProductServices.getAllType();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getBestProduct = async (req, res) => {
  try {
    const { limit } = req.query;
    const response = await ProductServices.getBestProduct(limit);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getdetailsProduct,
  deleteProduct,
  getAllProductSearch,
  getAllProductType,
  getAllProductPropose,
  getAllProduct,
  deleteManyProduct,
  getAllType,
  getBestProduct,
};

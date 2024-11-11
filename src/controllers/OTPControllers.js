const OTPServices = require("../services/OTPServices");

const createOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!email) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "Sai định dạng email",
      });
    } 
    const response = await OTPServices.createOTP(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: 'loi cho nay',
    });
  }
};

const createOTPPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!email) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "Sai định dạng email",
      });
    } 
    const response = await OTPServices.createOTPPassword(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: 'loi cho nay',
    });
  }
};

const deleteOTP = async (req, res) => {
  try {
    const email = req.params.email;
    if (!email) {
      return res.status(200).json({
        status: "ERR",
        message: "The email is required",
      });
    }
    const response = await OTPServices.deleteOTP(email);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createOTP,
  createOTPPassword,
  deleteOTP,
};

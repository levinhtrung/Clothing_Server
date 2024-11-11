const UserServices = require("../services/UserServices");
const JwtService = require("../services/JwtService");

const createUser = async (req, res) => {
  try {
    const { email, password, confirmPassword, otp } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password || !confirmPassword || !otp) {
      return res.status(200).json({
        status: "ERR",
        message: "Không được để trống",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "Sai định dạng email",
      });
    } else if (password?.length < 6) {
      return res.status(200).json({
        status: "ERR",
        message: "Mật khẩu phải ít nhất 6 kí tự",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "Mật khẩu không trùng khớp",
      });
    }
    const response = await UserServices.createUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "Không được để trống",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "Sai định dạng email",
      });
    }
    const response = await UserServices.loginUser(req.body);
    const { refresh_token, ...newRespone } = response;
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true, //chỉ lấy được cookie bằng http thôi, ko lấy được bằng js
      secure: false, // bảo mật phía client
      sameSite: "strict",
      maxAge: 31536000000, //1 năm
      path: "/",
    });
    return res.status(200).json({ ...newRespone, refresh_token });
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({
      status: "OK",
      message: "Logout SUCCESS",
    });
  } catch (e) {
    return res.status(404).json({
      message: "err logout",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;

    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    if (data?.phone && !data?.phone?.match(/^[0-9]{10}$/)) {
      return res.status(404).json({
        status: "ERR",
        message: "Wrong phone number format",
      });
    }
    const response = await UserServices.updateUser(userId, data);

    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: "loi update day",
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const data = req.body;

    if (
      !data?.email ||
      !data?.password ||
      !data?.confirmPassword ||
      !data?.otp
    ) {
      return res.status(200).json({
        status: "ERR",
        message: "Không được để trống",
      });
    }
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(data?.email);
    if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "Wrong email format",
      });
    }
    if (data?.password !== data?.confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "Mật khẩu không trùng khớp",
      });
    }
    const response = await UserServices.updatePassword(data);

    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }

    const response = await UserServices.deleteUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteManyUser = async (req, res) => {
  try {
    const ids = req.body.ids;
    if (!ids) {
      return res.status(200).json({
        status: "ERR",
        message: "The ids is required",
      });
    }
    const response = await UserServices.deleteManyUser(ids);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const response = await UserServices.getAllUser();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailsUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const response = await UserServices.getDetailsUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: "ERR",
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    // const token = req.cookies.refresh_token;
    const token = req.headers.token.split(" ")[1];
    // console.log("token", token);
    if (!token) {
      return res.status(404).json({
        status: "ERR",
        message: "The token is required",
      });
    }
    const response = await JwtService.refreshTokenJwtService(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: "errrrrr",
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  updatePassword,
  deleteUser,
  getAllUser,
  getDetailsUser,
  refreshToken,
  logoutUser,
  deleteManyUser,
};

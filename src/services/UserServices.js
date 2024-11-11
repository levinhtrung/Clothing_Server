const User = require("../models/UserModel");
const OTP = require("../models/OTPModel");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { email, password, otp } = newUser;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser !== null) {
        resolve({
          status: "ERR",
          message: "Email này đã tồn tại",
        });
      } else {
        const checkOTP = await OTP.findOne({
          otp: otp,
        });
        const hash = bcrypt.hashSync(password.toString(), 10);

        if (checkOTP) {
          const createUser = await User.create({
            email,
            password: hash,
          });
          if (createUser) {
            resolve({
              status: "OK",
              message: "SUCCESS",
              data: createUser,
            });
          }
        } else {
          resolve({
            status: "ERR",
            message: "Mã OTP không chính xác",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "Email này chưa được đăng ký",
        });
      }

      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      if (!comparePassword) {
        resolve({
          status: "ERR",
          message: "The password or user in incorrect",
        });
      }
      const access_token = await genneralAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });
      const refresh_token = await genneralRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      const updateUser = await User.findByIdAndUpdate(id, data, { new: true });

      resolve({
        status: "OK",
        message: "SUCCESS",
        updateUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updatePassword = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        email: data?.email,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      const hash = bcrypt.hashSync(data?.password.toString(), 10);
      const update = {
        $set: {
          password: hash,
        },
      };
      const checkOTP = await OTP.findOne({
        otp: data?.otp,
      });

      if (checkOTP) {
        const updateUser = await User.updateOne(
          {
            email: data?.email,
          },
          update
        );
        resolve({
          status: "OK",
          message: "SUCCESS",
          updateUser,
        });
      } else {
        resolve({
          status: "ERR",
          message: "Mã OTP Không chính xác",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }

      await User.findByIdAndDelete(id);

      resolve({
        status: "OK",
        message: "DELETE USER SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyUser = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await User.deleteMany({ _id: ids });
      resolve({
        status: "OK",
        message: "DELETE MANY USER SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find();

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: allUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: id,
      });
      if (user === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  updatePassword,
  deleteUser,
  getAllUser,
  getDetailsUser,
  deleteManyUser,
};

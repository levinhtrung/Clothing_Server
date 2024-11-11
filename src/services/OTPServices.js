const OTP = require("../models/OTPModel");
const User = require("../models/UserModel");
const EmailServices = require("./EmailServices");

const createOTP = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { email } = newUser;
    try {
      const checkUserExist = await User.findOne({
        email: email,
      });
      if (checkUserExist !== null) {
        resolve({
          status: "ERR",
          message: "Email này đã tồn tại",
        });
      }
      const checkUser = await OTP.findOne({
        email: email,
      });
      const numbers = await EmailServices.sendEmailCreateUser(email);
      if (checkUser !== null) {
        const update = {
          $set: {
            otp: numbers,
          },
        };
        const updateOTP = await OTP.updateOne(
          {
            email: email,
          },
          update
        );
        resolve({
          status: "OK",
          message: "Thay đổi mã OTP thành công",
          data: updateOTP,
        });
      } else {
        const createOTP = await OTP.create({
          email,
          otp: numbers,
        });
        if (createOTP) {
          resolve({
            status: "OK",
            message: "Thêm mã OTP thành công",
            data: createOTP,
          });
        }
      }
    } catch (e) {
      reject({
        status: "ERR",
        message: "Loii",
      });
    }
  });
};

const createOTPPassword = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { email } = newUser;
    console.log("email", email);
    try {
      const checkUserExist = await User.findOne({
        email: email,
      });
      if (checkUserExist === null) {
        resolve({
          status: "ERR",
          message: "Email này chưa được đăng ký",
        });
      }
      const checkUser = await OTP.findOne({
        email: email,
      });
      console.log("checkUser", checkUser);
      const numbers = await EmailServices.sendEmailCreateUser(email);
      if (checkUser !== null) {
        const update = {
          $set: {
            otp: numbers,
          },
        };
        const updateOTP = await OTP.updateOne(
          {
            email: email,
          },
          update
        );
        resolve({
          status: "OK",
          message: "Thay đổi mã OTP thành công",
          data: updateOTP,
        });
      } else {
        const createOTP = await OTP.create({
          email,
          otp: numbers,
        });
        if (createOTP) {
          resolve({
            status: "OK",
            message: "Thêm mã OTP thành công",
            data: createOTP,
          });
        }
      }
    } catch (e) {
      reject({
        status: "ERR",
        message: "Loii",
      });
    }
  });
};

const deleteOTP = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await OTP.findOne({
        email: email,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      await OTP.deleteOne();
      resolve({
        status: "OK",
        message: "DELETE USER SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createOTP,
  createOTPPassword,
  deleteOTP,
};

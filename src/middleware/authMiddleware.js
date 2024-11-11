const jwt = require("jsonwebtoken");
require("dotenv").config();

//chỉ admin mới đc làm gì đó (xóa user...)
const authMiddleware = (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    //nếu isAdmin true thì có thể xóa, còn false thì sẽ vào err
    if (err) {
      return res.status(404).json({
        message: "The authemtication",
        status: "ERROR",
      });
    }
    if (user?.isAdmin) {
      next();
    } else {
      return res.status(404).json({
        message: "The authemtication",
        status: "ERROR 2",
      });
    }
  });
};

const authUserMiddleware = (req, res, next) => {
  // console.log('checkToken', req.headers.token)
  const token = req.headers.token?.split(" ")[1];
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      //nếu nó chưa đăng nhập
      return res.status(404).json({
        message: "The authemtication",
        status: "ERROR 4",
      });
    }
    // console.log(user?.id, "vs", userId);
    if (user?.isAdmin || user?.id === userId) {
      next();
    } else {
      return res.status(404).json({
        message: "The authemtication",
        status: "ERROR 3",
      });
    }
  });
};

module.exports = {
  authMiddleware,
  authUserMiddleware,
};

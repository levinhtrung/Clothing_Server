const jwt = require("jsonwebtoken");
require("dotenv").config();

const genneralAccessToken = async (payload) => {
  // console.log('pay', payload)
  const access_token = jwt.sign(
    {
      ...payload,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "2h" }
  );

  return access_token;
};

const genneralRefreshToken = async (payload) => {
  // console.log('pay', payload)
  const refresh_token = jwt.sign(
    {
      ...payload,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: "30d" }
  );

  return refresh_token;
};

const refreshTokenJwtService = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          resolve({
            status: "ERR",
            message: "The authemticationnn",
          });
        }
        let access_token;
        access_token = await genneralAccessToken({
          id: user?.id,
          isAdmin: user?.isAdmin,
        });
        // }
        resolve({
          status: "OK",
          message: "SUCCESS",
          access_token,
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  genneralAccessToken,
  genneralRefreshToken,
  refreshTokenJwtService,
};

const jwt = require("jsonwebtoken");
const secretKey = "Secret key secret key 1234";
const options = {
  expiresIn: "1h",
};
const payload = {};

const createToken = () => {
  return jwt.sign(payload, secretKey, options);
};

module.exports = createToken;

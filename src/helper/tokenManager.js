const jwt = require("jsonwebtoken");

function generateAccessToken(data) {
  const user = {
    id: data.id,
    email: data.email,
  };

  const accessToken = jwt.sign(user, process.env.JWT_KEY_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return accessToken;
}

module.exports = generateAccessToken;

const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const accessToken = jwt.sign(
    user,
    process.env.JWT_KEY_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    },
  );

  return accessToken;
};

module.exports = { generateToken };
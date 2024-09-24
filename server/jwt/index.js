const jwt = require("jsonwebtoken");
const privateKey = "SurY4Fin4nce";

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, "mySecRetkeY");
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET || privateKey,
    {
      expiresIn: "7d", // Token expiration time
    }
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};

const jwt = require("jsonwebtoken");
const privateKey = "SurY4Fin4nce";

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      budget: user.currentBudget,
      expense: user.expenses,
      revenue: user.revenues,
    },
    "mySecRetkeY",
    {
      expiresIn: "15m",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      budget: user.currentBudget,
      expense: user.expenses,
      revenue: user.revenues,
    },
    "mySecRetkeY",
    {
      expiresIn: "7d",
    }
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};

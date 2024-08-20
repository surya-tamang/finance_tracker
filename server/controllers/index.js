const users = require("../models/model");
const getAllUsers = (req, res) => {
  const allUsers = users.find({});
  res.json(users);
};

module.exports = {
  getAllUsers,
};

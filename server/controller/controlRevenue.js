const user = require("../model/user");
const revenue = require("../model/revenue");

const addRevenue = async (req, res) => {
  try {
    const { userId } = req.params;
    const { source, amount, date } = req.body;

    const newRevenue = new revenue({ userId, source, amount, date });
    await newRevenue.save();

    const updatedUser = await user.findById(userId);
    updatedUser.currentBudget += Number(amount);
    updatedUser.revenues.push(newRevenue._id);
    await updatedUser.save();

    res
      .status(201)
      .json({ msg: "Revenue added successfully", Revenue: newRevenue });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error adding Revenue", error });
  }
};

const fetchUserRevenues = async (req, res) => {
  const { userId } = req.params;
  try {
    const userRevenues = await revenue.find({ userId });
    res.status(201).json(userRevenues);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "server error" });
  }
};

module.exports = {
  addRevenue,
  fetchUserRevenues,
};

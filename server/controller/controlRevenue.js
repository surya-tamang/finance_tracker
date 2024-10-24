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

const updateRevenues = async (req, res) => {
  const { id } = req.params;
  const { amount, source } = req.body;

  try {
    const details = {};
    if (amount) details.amount = amount;
    if (source) details.source = source;

    const updatedRev = await revenue.findByIdAndUpdate(
      id,
      { $set: details },
      { new: true }
    );

    if (!updatedRev) {
      return res.status(404).json({ msg: "user not found" });
    }
    return res.status(200).json({ msg: "Updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

const deleteRevenues = async (req, res) => {
  const { id } = req.params;
  try {
    await revenue.findByIdAndDelete(id);
    return res.status(200).json({ msg: "deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  addRevenue,
  fetchUserRevenues,
  deleteRevenues,
  updateRevenues,
};

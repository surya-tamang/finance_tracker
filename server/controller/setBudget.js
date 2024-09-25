const user = require("../model/user");

const setBudget = async (req, res) => {
  try {
    const { budget } = req.body;
    const { id } = req.params;

    const updatedUser = await user.findByIdAndUpdate(
      id,
      { currentBudget: budget },
      { new: true }
    );

    if (updatedUser) {
      return res.status(200).json({ msg: "Budget set" });
    }
  } catch (error) {
    console.error("Error setting budget:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = setBudget;

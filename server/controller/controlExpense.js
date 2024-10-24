const user = require("../model/user");
const expense = require("../model/expense");

const addExpense = async (req, res) => {
  try {
    const { userId } = req.params;
    const { amount, purpose, category, date } = req.body;

    const newExpense = new expense({ userId, amount, purpose, category, date });
    await newExpense.save();

    const updatedUser = await user.findById(userId);
    updatedUser.currentBudget -= amount;
    updatedUser.expenses.push(newExpense._id);
    await updatedUser.save();

    res
      .status(201)
      .json({ msg: "Expense added successfully", expense: newExpense });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error adding expense", error });
  }
};

const fetchUserExpenses = async (req, res) => {
  const { userId } = req.params;
  try {
    const userExpenses = await expense.find({ userId });
    res.status(201).json(userExpenses);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "server error" });
  }
};

const updateExpenses = async (req, res) => {
  const { id } = req.params;
  const { amount, purpose, category } = req.body;

  try {
    const details = {};
    if (amount) details.amount = amount;
    if (purpose) details.purpose = purpose;
    if (category) details.category = category;

    const updatedExp = await expense.findByIdAndUpdate(
      id,
      { $set: details },
      { new: true }
    );

    if (!updatedExp) {
      return res.status(404).json({ msg: "user not found" });
    }
    return res.status(200).json({ msg: "Updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

const deleteExpenses = async (req, res) => {
  const { id } = req.params;
  try {
    await expense.findByIdAndDelete(id);
    return res.status(200).json({ msg: "deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
};
module.exports = {
  addExpense,
  fetchUserExpenses,
  updateExpenses,
  deleteExpenses,
};

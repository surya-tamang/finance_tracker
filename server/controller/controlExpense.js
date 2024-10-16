const user = require("../model/user");
const expense = require("../model/expense");

const addExpense = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const { amount, purpose, category, date } = req.body;

    const newExpense = new expense({ userId, amount, purpose, category, date });
    await newExpense.save();

    const updatedUser = await user.findById(userId);
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

module.exports = {
  addExpense,
  fetchUserExpenses,
};

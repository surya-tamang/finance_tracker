const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  amount: { type: Number, required: true },
  purpose: { type: String },
  category: { type: String, required: true },
  date: { type: Date },
});

const expense = mongoose.model("expense", expenseSchema);

module.exports = expense;

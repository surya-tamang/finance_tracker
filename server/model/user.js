const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  profile: { type: String },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  currentBudget: {
    type: String,
  },
  expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }],
  revenues: [{ type: mongoose.Schema.Types.ObjectId, ref: "Revenue" }],
});

const User = mongoose.model("user", userSchema);

module.exports = User;

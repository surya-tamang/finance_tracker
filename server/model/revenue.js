const mongoose = require("mongoose");

const revenueSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  source: { type: String, required: true },
  description: { type: String },
});

const revenue = mongoose.model("revenue", revenueSchema);

module.exports = revenue;

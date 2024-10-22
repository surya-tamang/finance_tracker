const mongoose = require("mongoose");

const revenueSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  source: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date },
});

const revenue = mongoose.model("revenue", revenueSchema);

module.exports = revenue;

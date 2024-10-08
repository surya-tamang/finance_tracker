const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["Expense", "Revenue"], required: true },
});

const category = mongoose.model("category", categorySchema);

module.exports = category;

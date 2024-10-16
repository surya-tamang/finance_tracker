const express = require("express");
const router = express.Router();
const {
  registerUser,
  updateUser,
  deleteUser,
  getUserById,
  loginUser,
} = require("../controller/controlUser");

const {
  addExpense,
  fetchUserExpenses,
} = require("../controller/controlExpense");
const {
  addRevenue,
  fetchUserRevenues,
} = require("../controller/controlRevenue");

router.route("/login").post(loginUser);
router.route("/signup").post(registerUser);

router.route("/user/:id").get(getUserById).delete(deleteUser).put(updateUser);
router.route("/user/expenses/:userId").post(addExpense).get(fetchUserExpenses);
router.route("/user/revenues/:userId").post(addRevenue).get(fetchUserRevenues);
module.exports = router;

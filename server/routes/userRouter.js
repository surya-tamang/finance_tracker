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

router.route("/login").post(loginUser);
router.route("/signup").post(registerUser);

router.route("/user/:id").get(getUserById).delete(deleteUser).put(updateUser);
router.route("/user/expenses/:userId").post(addExpense).get(fetchUserExpenses);
module.exports = router;

const express = require("express");
const router = express.Router();
const { verify } = require("../middleware/verify");
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
  deleteExpenses,
  updateExpenses,
  fetchExpense,
} = require("../controller/controlExpense");
const {
  addRevenue,
  fetchUserRevenues,
  updateRevenues,
  deleteRevenues,
  fetchRevenue,
} = require("../controller/controlRevenue");

const {
  addAdmin,
  updateAdmin,
  loginAdmin,
} = require("../controller/controlAdmin");

router.route("/login").post(loginUser);
router.route("/signup").post(registerUser);

router
  .route("/user/:id")
  .get(getUserById)
  .delete(verify, deleteUser)
  .put(updateUser);

// expenses route
router.route("/user/expenses/:userId").post(addExpense).get(fetchUserExpenses);
router
  .route("/user/expenses/:id")
  .put(updateExpenses)
  .delete(deleteExpenses)
  .get(fetchExpense);

// revenues route
router.route("/user/revenues/:userId").post(addRevenue).get(fetchUserRevenues);
router
  .route("/user/revenues/:id")
  .put(updateRevenues)
  .delete(deleteRevenues)
  .get(fetchRevenue);

// admin route
router.route("/admin/:id").put(updateAdmin);
router.route("/admin/login").post(loginAdmin);
router.route("/admin").post(addAdmin);
module.exports = router;

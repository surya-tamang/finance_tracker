const express = require("express");
const {
  getUser,
  registerUser,
  updateUser,
  deleteUser,
  getUserById,
  loginUser,
} = require("../controller");
const router = express.Router();

router.route("/users").get(getUser);
router.route("/login").post(loginUser);
router.route("/signup").post(registerUser);

router.route("user/:id").get(getUserById).delete(deleteUser).patch(updateUser);

module.exports = router;

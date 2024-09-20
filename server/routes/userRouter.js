const express = require("express");
const {
  getUser,
  registerUser,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controller");
const router = express.Router();

router.route("/users").get(getUser);
router.route("/register").post(registerUser);

router.route("user/:id").get(getUserById).delete(deleteUser).patch(updateUser);

module.exports = router;

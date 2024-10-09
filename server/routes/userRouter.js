const express = require("express");
const router = express.Router();
const {
  registerUser,
  updateUser,
  deleteUser,
  getUserById,
  loginUser,
  uploadProfile,
} = require("../controller/controlUser");

router.route("/login").post(loginUser);
router.route("/signup").post(registerUser);

router
  .route("/user/:id")
  .get(getUserById)
  .delete(deleteUser)
  .patch(updateUser)
  .post(uploadProfile);

module.exports = router;

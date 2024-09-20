const express = require("express");
const { getUser, registerUser } = require("../controller");
const router = express.Router();

router.route("/users").get(getUser);
router.route("/register").post(registerUser);

module.exports = router;

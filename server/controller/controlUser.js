const user = require("../model/user");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const { generateAccessToken, generateRefreshToken } = require("../jwt");

const getUser = async (req, res) => {
  try {
    const users = await user.find({});
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to fetch users" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await user.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({ msg: "No user found" });
    }

    if (password !== existingUser.password) {
      return res.status(401).json({ msg: "Incorrect email or password" });
    }

    const accessToken = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        password: existingUser.password,
        currentBudget: existingUser.currentBudget,
        expenses: existingUser.expenses,
        revenues: existingUser.revenues,
      },
      "seCreTKeYOfSury4",
      {
        expiresIn: "15m",
      }
    );
    const refreshToken = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        password: existingUser.password,
        currentBudget: existingUser.currentBudget,
        expenses: existingUser.expenses,
        revenues: existingUser.revenues,
      },
      "seCreTKeYOfSury4",
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      msg: "Login success",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      console.log("Validation failed: Missing fields");
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new user({
      firstName,
      lastName,
      email,
      password,
    });

    await newUser.save();

    return res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const particularUser = await user.findById(req.params.id);
    return res.status(201).json(particularUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  await user.findByIdAndDelete(req.params.id);

  return res.status(201).json({ msg: "Deleted successfully" });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, currentBudget, profile, email, password } =
    req.body;

  try {
    const updatedUser = await user.findByIdAndUpdate(
      id,
      {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(password && { password }),
        ...(currentBudget && { currentBudget }),
        ...(profile && { profile }),
        ...(email && { email }),
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res
      .status(200)
      .json({ msg: "Updated successfully", updated: updatedUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server error" });
  }
};

const uploadProfile = async (req, res) => {
  const { id } = req.params;
  const { img } = req.body;
  if (!img) {
    return res.status(400).json({ msg: "No image provided" });
  }
  try {
    const updatedUser = await user.findByIdAndUpdate(
      id,
      { profile: img },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(400).json({ msg: "Failed to upload" });
    }

    return res.status(201).json({
      msg: "Uploaded successfully from upload profile",
      updated: updatedUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  getUser,
  registerUser,
  getUserById,
  deleteUser,
  updateUser,
  loginUser,
  uploadProfile,
};

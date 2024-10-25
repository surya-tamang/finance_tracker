const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const getUser = async (req, res) => {
  try {
    const Users = await User.find({});
    return res.json(Users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to fetch Users" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({ msg: "No User found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
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

    if (!firstName || !lastName || !email || !password) {
      console.log("Validation failed: Missing fields");
      return res.status(400).json({ msg: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
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
    const particularUser = await User.findById(req.params.id)
      .populate("expenses")
      .populate("revenues");
    return res.status(201).json(particularUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    await User.findByIdAndDelete(req.params.id);
    return res.status(201).json({ msg: "Deleted successfully" });
  } else {
    return res.status(403).json({ msg: "you aren't allowed" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    currentBudget,
    profile,
    email,
    currentPwd,
    password,
  } = req.body;

  try {
    let updateFields = {};

    if (password) {
      const existingUser = await User.findById(id);
      const isPasswordCorrect = await bcrypt.compare(
        currentPwd,
        existingUser.password
      );
      if (isPasswordCorrect) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        updateFields.password = hashedPassword;
      } else {
        return res.status(404).json({ msg: "Current password doesn't match" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields.password = hashedPassword;
    }

    if (firstName) updateFields.firstName = firstName;
    if (lastName) updateFields.lastName = lastName;
    if (currentBudget) updateFields.currentBudget = currentBudget;
    if (profile) updateFields.profile = profile;
    if (email) updateFields.email = email;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json({ msg: "Updated successfully", updatedUser });
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
    const updatedUser = await User.findByIdAndUpdate(
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

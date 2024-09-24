const user = require("../model/user");
// const bcrypt = require("bcryptjs");
const { generateAccessToken, generateRefreshToken } = require("../jwt");

// to see the users

const getUser = async (req, res) => {
  try {
    const users = await user.find({});
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to fetch users" });
  }
};

// to handle logins

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

    const accessToken = generateAccessToken(existingUser);
    const refreshToken = generateRefreshToken(existingUser);

    return res.status(200).json({
      msg: "Login success",
      access_token: {
        access: accessToken,
        refresh: refreshToken,
      },
    });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

// to register new user

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

// to get particular user by id

const getUserById = async (req, res) => {
  const { id } = req.params;
  const particularUser = user.find(id);
  return res.json(particularUser);
};

// to delete user by id

const deleteUser = async (req, res) => {
  await user.findByIdAndDelete(req.params.id);

  return res.status(201).json({ msg: "Deleted successfully" });
};

//to update user

const updateUser = async (req, res) => {
  const body = req.body;
  await user.findByIdAndUpdate(req.params.id, body);

  return res.status(204).json({ msg: "Updated successfully" });
};

module.exports = {
  getUser,
  registerUser,
  getUserById,
  deleteUser,
  updateUser,
  loginUser,
};

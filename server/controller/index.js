const user = require("../model/user");
// const bcrypt = require("bcryptjs");

const getUser = async (req, res) => {
  try {
    const users = await user.find({});
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to fetch users" });
  }
};

const registerUser = async (req, res) => {
  try {
    // Log the received data
    console.log("Received registration data:", req.body);

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

    // Log the user object before saving
    console.log("New User Object:", newUser);

    await newUser.save();

    return res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};
const getUserById = async (req, res) => {
  const { id } = req.params;
  const particularUser = user.find(id);
  return res.json(particularUser);
};

const deleteUser = async (req, res) => {
  await user.findByIdAndDelete(req.params.id);

  return res.status(201).json({ msg: "Deleted successfully" });
};

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
};

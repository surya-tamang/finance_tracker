const admin = require("../model/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const addAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const existingAdmin = await admin.findOne({ email });
  if (existingAdmin) {
    res.status(400).json({ msg: "Admin exist" });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new admin({
      name,
      email,
      password: hashedPassword,
    });
    newAdmin.save();
    return res.status(201).json({ msg: "new admin added" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server error" });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await admin.findOne({ email });
    if (!existingAdmin) {
      return res.status(400).json({ msg: "No admin found" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingAdmin.password
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

const updateAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const { id } = req.params;

  try {
    let updateFields = {};

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields.password = hashedPassword;
    }

    if (name) updateFields.name = name;
    if (email) updateFields.email = email;

    const updatedAdmin = await admin.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ msg: "Admin not found" });
    }

    return res
      .status(200)
      .json({ msg: "Admin updated successfully", updatedAdmin });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { addAdmin, updateAdmin, loginAdmin };

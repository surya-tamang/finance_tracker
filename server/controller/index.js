const user = require("../model/user");

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
  const body = req.body;

  if (!body.first_name || !body.last_name || !body.email || !body.password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const result = await user.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password: body.password,
    });

    console.log(result);

    return res.status(201).json({
      msg: "User registered successfully",
      newId: result._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to register user" });
  }
};

module.exports = {
  getUser,
  registerUser,
};

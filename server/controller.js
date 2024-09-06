const connectDb = require("./connectDb");
const querystring = require("querystring");
const { ObjectId } = require("mongodb");

const getUsers = async (res) => {
  try {
    let db = await connectDb();
    const collection = db.collection("users");
    const users = await collection.find({}).toArray();
    res.statusCode = 200;
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.setHeader("Content-type", "text/plain");
    res.end("internal server error");
  }
};

const addUser = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      let newUser = querystring.parse(body);
      let db = await connectDb();
      const collection = db.collection("users");

      const result = await collection.insertOne(newUser);

      const addedUser = await collection.findOne({ _id: result.insertedId });

      res.statusCode = 200;
      res.setHeader("Content-type", "application/json");
      res.end(JSON.stringify(addedUser));
    } catch (error) {
      console.log(error);
      if (error.code === 11000) {
        res.statusCode = 409;
        res.setHeader("Content-type", "text/plain");
        res.end("Duplicate email found");
      } else {
        res.statusCode = 400;
        res.setHeader("Content-type", "text/plain");
        res.end("Not inserted");
      }
    }
  });
};

const updateUser = (req, res) => {
  let body = "";
  let id = req.url.split("/")[2];

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      let updatedData = querystring.parse(body);
      let db = await connectDb();
      let collection = db.collection("users");

      let result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
      );

      if (result.matchedCount === 0) {
        res.statusCode = 404;
        res.setHeader("Content-type", "text/plain");
        res.end("User not found");
      }

      let updatedUser = await collection.findOne({ _id: new ObjectId(id) });

      res.statusCode = 200;
      res.setHeader("Content-type", "application/json");
      res.end(JSON.stringify(updatedUser));
    } catch (error) {
      console.log(error);
      res.statusCode = 400;
      res.setHeader("Content-type", "text/plain");
      res.end("User not found");
    }
  });
};

const deleteUser = async (req, res) => {
  let id = req.url.split("/")[2];
  try {
    let db = await connectDb();
    let collection = db.collection("users");

    let result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      res.statusCode = 404;
      res.end("User not found");
    }

    res.statusCode = 200;
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify({ msg: "user deleted successfully" }));
  } catch (error) {
    console.log(error);
    res.statusCode = 400;
    res.setHeader("Content-type", "text/plain");
    res.end("Internal server error");
  }
};

module.exports = { getUsers, addUser, updateUser, deleteUser };

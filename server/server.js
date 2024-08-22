const { MongoClient } = require("mongodb");
const { connectDB } = require("./connectDb");
const url = "mongodb://localhost:27017";
const port = 8848;

const client = new MongoClient(url);

connectDB(client);

//   let response = await collection.find({}).toArray();

//   console.log(response);

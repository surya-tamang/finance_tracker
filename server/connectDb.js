const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

const connectDb = async () => {
  let connection = await client.connect();
  let db = connection.db("finance_tracker");
  return db;
};

module.exports = connectDb;

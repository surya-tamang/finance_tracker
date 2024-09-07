const { MongoClient } = require("mongodb");
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

const connectDb = async () => {
  let connection = await client.connect();
  let db = connection.db("finance_tracker");
  return db;
};

module.exports = connectDb;

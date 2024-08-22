const connectDB = async (client) => {
  const result = await client.connect();
  const db = result.db("finance_tracker");
  const collection = db.collection("users");
  return collection;
};

module.exports = {
  connectDB,
};

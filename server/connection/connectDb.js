const mongoose = require("mongoose");

//  **************************/ function to connect to database \******************************\\

const connectToDb = async (url) => {
  return mongoose.connect(url);
};
module.exports = { connectToDb };

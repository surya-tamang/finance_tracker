const express = require("express");
const connectDb = require("./connection/connectDb");
const router = require("./routes/userRouter");
const cors = require("cors");

const app = express();
const port = 8520;

// connecting to database

(async () => {
  try {
    await connectDb("mongodb://localhost:27017/finance_tracker");
    console.log("Connected to server");
  } catch (error) {
    console.error(error);
  }
})();

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use("/", router);

app.listen(port, () => console.log(`Server started on port ${port}`));

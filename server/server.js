const express = require("express");
const connectDb = require("./connection/connectDb");
const router = require("./routes/userRouter");
const cors = require("cors");
const dotenv = require("dotenv");
const setBudget = require("./controller/setBudget");
const { getUser } = require("./controller/controlUser");
dotenv.config();

const app = express();
const port = 8520;

// connecting to database

(async () => {
  try {
    await connectDb(
      "mongodb+srv://tmgsurya055:niA9hdlanUw2FzJQ@financetracker.g6oyf.mongodb.net/finance_tracker?retryWrites=true&w=majority&appName=financeTracker"
    );
    console.log("Connected to server");
  } catch (error) {
    console.error(error);
  }
})();

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json({ limit: "10mb" }));

// routes
app.get("/users", getUser);
app.use("/api", router);
app.post("/api/setBudget/:id", setBudget);

app.listen(port, () => console.log(`Server started on port ${port}`));

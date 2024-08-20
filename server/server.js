const express = require("express");
const cors = require("cors");
const { connectToDb } = require("./connection/connectDb");
const router = require("./routes/userRouter");
const port = 8848;

const app = express();
app.use(cors());
app.use(express.json());

//  **************************/ connect to database \******************************\\

connectToDb("mongodb://localhost:27017/finance_tracker");

//  **************************/ routes \******************************\\

app.use("/", router);

app.listen(port, () => console.log(`Server started in port ${port}`));

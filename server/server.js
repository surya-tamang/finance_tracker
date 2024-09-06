const http = require("http");
const connectDb = require("./connectDb");
const querystring = require("querystring");
const { error } = require("console");

const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/users") {
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
  } else if (req.method === "POST" && req.url === "/users") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      try {
        const newUser = querystring.parse(body);

        let db = await connectDb();
        const collection = db.collection("users");
        const result = await collection.insertOne(newUser);
        const insertedUser = await collection.findOne({
          _id: result.insertedId,
        });
        res.statusCode = 200;
        res.setHeader("Content-type", "application/json");
        res.end(JSON.stringify(insertedUser));
      } catch (error) {
        console.log(error);
        if (error.code === 11000) {
          res.statusCode = 409;
          res.setHeader("Content-type", "text/plain");
          res.end("Duplicate email found");
        } else {
          res.statusCode = 500;
          res.setHeader("Content-type", "text/plain");
          res.end("Not inserted");
        }
      }
    });
  } else {
    res.statusCode = 401;
    res.setHeader("Content-type", "text/plain");
    res.end("Not found");
  }
});

const port = 8520;
server.listen(port, () => console.log(`Server started on port ${8520}`));

const http = require("http");
const connectDb = require("./connectDb");

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
  } else {
    res.statusCode = 400;
    res.setHeader("Content-type", "text/plain");
    res.end("Not found");
  }
});

const port = 8520;
server.listen(port, () => console.log(`Server started on port ${8520}`));

const http = require("http");
const { getUsers, addUser, updateUser, deleteUser } = require("./controller");
const cors = require("./cors");

const server = http.createServer(async (req, res) => {
  cors(req, res);
  if (req.method === "GET" && req.url === "/users") {
    getUsers(res);
  } else if (req.method === "POST" && req.url === "/users") {
    addUser(req, res);
  } else if (req.method === "PUT" && req.url.startsWith("/users")) {
    updateUser(req, res);
  } else if (req.method === "DELETE" && req.url.startsWith("/users")) {
    deleteUser(req, res);
  } else {
    res.statusCode = 404;
    res.setHeader("Content-type", "text/plain");
    res.end("Not found");
  }
});

const port =process.env.PORT || 8520;
server.listen(port, () => console.log(`Server started on port ${8520}`));

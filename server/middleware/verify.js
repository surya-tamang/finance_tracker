const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "seCreTKeYOfSury4", (err, user) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ msg: "Token is not valid" });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ msg: "You are not authenticated" });
  }
};

module.exports = { verify };

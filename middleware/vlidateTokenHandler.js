const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateaToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  //   console.log("authHeader %s %s", authHeader, process.env.ACCESS_TOKEN_SECRET);

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      console.log("decoded", decoded);
      req.user = decoded.user;
      next();
      //   console.log("decoded", decoded);
    });
    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
  }
});
module.exports = validateaToken;

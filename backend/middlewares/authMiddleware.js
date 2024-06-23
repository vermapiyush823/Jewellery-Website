const jwt = require("jsonwebtoken");
const config = require("../config");

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ errors: "Auth Error" });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Invalid Token" });
  }
};

module.exports = fetchUser;

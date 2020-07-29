const jwt = require("jsonwebtoken");
process.env.SECRET_KEY = "secret";

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");

    if (!jwtToken) {
      return res.status(403).json("Not Authorize");
    }

    const payload = jwt.verify(jwtToken, process.env.SECRET_KEY);

    req.empuser = payload.empuser;
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("Not Authorize");
  }

  next();
};

const jwt = require("jsonwebtoken");

function jwtGenerator(id) {
  process.env.SECRET_KEY = "secret";
  const payload = {
    empuser: id,
  };

  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 1440 });
}

module.exports = jwtGenerator;

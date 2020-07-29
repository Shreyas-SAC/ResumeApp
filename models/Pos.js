const Sequelize = require("sequelize");
const db = require("../db");

const Pos = db.define("pos", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  roles: {
    type: Sequelize.STRING,
  },
});

Pos.sync().then(() => {
  console.log("table created");
});

module.exports = Pos;

const Sequelize = require("sequelize");
const db = require("../db");

const Gig = db.define(
  "gig",
  {
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    position: {
      type: Sequelize.STRING,
    },
    files: {
      type: Sequelize.STRING,
    },
  },
  {
    tablename: "gigs",
    paranoid: true,
    timestamps: true,
    deletedAT: "deletedAt",
  }
);

Gig.sync().then(() => {
  console.log("table created");
});
module.exports = Gig;

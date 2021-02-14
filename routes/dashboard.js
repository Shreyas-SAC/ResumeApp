const router = require("express").Router();
const db = require("../db");
const path = require("path");
const Gig = require("../models/Gig");
const Sequelize = require("sequelize");
const { where } = require("sequelize");
const Op = Sequelize.Op;
const authorization = require("../middleware/authorization");
const { lstat } = require("fs");

router.get("/getuser", async (req, res) =>
  Gig.findAll()
    .then((gigs) => {
      res.json({ gigs });
      console.log("users", gigs);
    })
    .catch((err) => console.log(err))
);

//Soft Deletion
router.delete("/deluser/:id", async (req, res) => {
  await Gig.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((gigs) => res.json(gigs))
    .catch((err) => console.log(err));
});

//Search for position
router.get("/search", (req, res) => {
  const { term } = req.query;

  Gig.findAll({ where: { position: { [Op.like]: "%" + term + "%" } } })
    .then((gigs) => {
      res.render({ gigs });
    })
    .catch((err) => console.log(err));
});

//Download File
/*router.get("/getdoc", (req, res, next) => {
  try {
    const file = `${__dirname}/uploads/uploads.pdf`;
    res.download(file);
    console.log("here");
  } catch (err) {
    console.log(err);
  }
});*/

/*router.get("/getdoc/topic/file/:id", function (req, res, next) {
  Topic.findByIdAndUpdate(req.params.id)
    .exec()
    .then((topic) => {
      let filepath = `${__dirname}/uploads/uploads.pdf`;
      console.log("filepath", filepath);
      res.download(filepath, topic.name + ".pdf", function (err) {
        if (err) {
          console.log("api get file err ", err);
        } else {
          // decrement a download credit, etc.
        }
      });
    })
    .catch((err) => console.log("error", err));
});*/

/*router.get("/getdoc", async (req, res, next) => {
  // filepath = path.join(__dirname, "../uploads");
  //filename = "report.pdf";
  //res.download(filepath, filename);
  Gig.findAll()
    .then((gigs) => {
      res.json({ gigs });
      console.log("users", gigs);
    })
    .catch((err) => console.log(err));

  /* res.download(__dirname + "./uploads/file.pdf", "file.pdf"),
    function (err) {
      console.log(err);
    };
});*/

router.get("/getdoc/:id", async (req, res, next) => {
  await Gig.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["files"],
  })
    .then((list) => res.status(200).json(list))
    .then((gigs) => {
      res.json(gigs);
    })
    .catch((err) => console.log(err));

  var filepath = path.join(__dirname, "../client/public/uploads");
  res.download(filepath);
  console.log(res);
  next();
});

/*router.get("/download/:file(*)", (req, res) => {
  var file = req.params.file;
  var fileLocation = path.join("../uploads", file);
  console.log(fileLocation);
  res.download(fileLocation, file);
});*/

module.exports = router;

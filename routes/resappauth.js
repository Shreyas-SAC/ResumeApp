const router = require("express").Router();
const db = require("../db");
const Gig = require("../models/Gig");
const Emp = require("../models/Emp");
const Pos = require("../models/Pos");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { route } = require("./dashboard");
const jwtGenerator = require("../utils/jwtGenerator");
const authorization = require("../middleware/authorization");
const validInfo = require("../middleware/validInfo");
const multer = require("multer");

//set storage engine
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  //rect the file
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

//registering
router.post("/register", upload.single("files"), async (req, res) => {
  console.log(req.file);
  let errors = [];

  // enter new user to the database

  Gig.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    position: req.body.position,
    files: req.file.path,
  })
    .then((gig) => {
      console.log("here", gig);
      return res.json(gig);
    })
    .catch((err) =>
      res.render("error", {
        error: err.message,
      })
    );
});

//Positions Inserting
router.post("/postpos", async (req, res) => {
  let { roles, company_name } = req.body;
  let errors = [];

  // enter new user to the database

  Pos.create({
    roles,
    company_name,
  }).then((pos) => res.json(pos));
  console
    .log("here", pos)
    .catch((err) => res.render("error", { error: err.message }));
});
//Positions posting
router.get("/getpos", async (req, res) =>
  Pos.findAll()
    .then((pos) => {
      res.json({ pos });
    })
    .catch((err) => console.log(err))
);

//Emp
process.env.SECRET_KEY = "secret";

//Bcrypt
const empusers = (empuser) => {
  if (!empuser) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      userData.password = hash;
      Emp.create(userData)
        .then((empuser) => {
          res.json({ status: empuser.email + "Sucessful!" });
        })
        .catch((err) => {
          res.send("error: " + err);
        });
    });
  } else {
    res.json({ error: "error" });
  }
};

//Login
router.post("/login", validInfo, (req, res) => {
  Emp.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((empuser) => {
      if (empuser) {
        if (bcrypt.compareSync(req.body.password, empuser.password)) {
          const token = jwtGenerator(empuser.id);
          res.json({ token });

          /*let token = jwt.sign(empuser.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440,
          });
          res.send(token);*/
        }
      } else {
        res.status(400).json({ error: "User does not exist" });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

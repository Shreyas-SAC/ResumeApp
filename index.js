const express = require("express");
/*const fileUpload = require("express-fileupload");*/
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const util = require("util");
const Gig = require("./models/Gig");
const multer = require("multer");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

//File-Upload
/*app.use(fileUpload());*/
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(express.static("./client/public"));

//File-Upload Endpoint

app.post("/upload", upload.single("files"), (req, res) => {
  console.log(req.file);
  let { firstname, lastname, email, position, files } = req.body;
  const gig = new Gig();
  Gig.create({
    firstname,
    lastname,
    email,
    position,
    files: req.file.path,
  }).then((gig) => res.json(gig));
  console.log("here", gig);
  gig.save().then((result) => {
    console.log(result);
    res.status(201).json({
      message: "File Uploaded Successfully",
      createdGig: {
        firstname: result.firstname,
        lastname: result.lastname,
        email: result.email,
        position: result.position,
        files: result.files,
      },
    });
  });
});

//File-Upload Endpoint
/*app.post("/upload", async (req, res) => {
  try {
    const gig = new Gig({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      position: req.body.position,
      files: URL,
    });
    gig.save().then((result) => {
      console.log(result);
      res.status(201).json({
        message: "File uploaded Successfully",
        createdFile: {
          firstname: result.firstname,
          lastname: result.lastname,
          email: result.email,
          position: result.position,
        },
      });
    });

    const file = req.files.file;
    const filename = file.name;
    const size = file.data.length;
    const extension = path.extname(filename);

    const allowedExtensions = /png|jpeg|jpg|gif|pdf/;

    if (!allowedExtensions.test(extension)) throw "Unsupported Extension!";

    const md5 = file.md5;
    const URL = "/uploads/" + md5 + extension;

    await util.promisify(file.mv)(`${__dirname}/client/public` + URL);

    /*const gig = new Gig.create({ files: URL });
    gig.files = URL;
    await gig.save();*/

/*Gig.create({
      firstname: "$firstname",
      files: URL,
    })
      .then((gig) => res.json(gig))
      .catch((err) => res.render("error", { error: err.message }));

    res.json({
      message: "File uploaded successfully!",
      url: URL,
    });
    console.log("Url", URL);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err,
    });
  }
});*/

//Database
const db = require("./db");
const { json } = require("body-parser");
const { url } = require("inspector");

//Test db
db.authenticate()
  .then(() => console.log("Database connected...."))
  .catch(() => console.log("Error: " + err));

//middleware
app.use(express.json()); //req.body
app.use(cors());

//Routes//

//Register and Login routes
app.use("/auth", require("./routes/resappauth"));

//Dashboard
app.use("/dashboard", require("./routes/dashboard"));

app.listen(5000, () => {
  console.log("server is running on port 5000");
});

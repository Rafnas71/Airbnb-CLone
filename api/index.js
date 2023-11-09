const express = require("express");
var app = express();
var cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const download = require("image-downloader");
const multer = require("multer");
const fs= require('fs')

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "bookingabcdef";
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL).then(() => console.log("Connected!"));
// booking123
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  userDoc = await User.find({ email });
  const user = userDoc[0];
  console.log(userDoc);
  if (userDoc) {
    // res.json("pass ok");
    const passOk = bcrypt.compareSync(password, user.password);
    if (passOk) {
      jwt.sign(
        { email: user.email, id: user._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok ");
    }
  } else {
    res.json("notfound");
  }
});

app.get("/profile", async (req, res) => {
  // console.log("/profile",req.cookies);
  const { token } = req.cookies;
  if (token) {
    await jwt.verify(token, jwtSecret, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  }
});

app.post("/logout", (req, res) => {
  console.log("logout fn");
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  console.log("Link" + link);
  const filename = "Photos" + Date.now() + ".jpg";
  await download.image({
    url: link,
    dest: __dirname + "/uploads/" + filename,
  });
  res.json(filename);
});

const upload = multer({ dest: "uploads/" });
app.post("/upload", upload.array("photos", 100), (req, res) => {
  const uploadedPhotos = []
  for (i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i]
    const parts = originalname.split('.')
    const ext = parts[parts.length-1]
    const newPath = path+'.'+ext
    fs.renameSync(path,newPath)
    uploadedPhotos.push(newPath.replace('uploads\\',''))
  }
  res.json(uploadedPhotos)
});

app.get("/", (req, res) => {
  res.json("test");
});

app.listen(4000);

const express = require("express");
var app = express();
var cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "rafnasnknndknknknkncds";
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
        { email: user.email, id: user._id},
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

app.get("/profile", (req, res) => {
  console.log(req.cookies);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, async(err, userData) => {
      if (err) throw err;
      const {name,email,_id} = await User.findById(userData.id)
      res.json({name,email,_id});
    });
  }
});

app.get("/", (req, res) => {
  res.json("test");
});
 
app.listen(4000);

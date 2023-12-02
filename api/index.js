const express = require("express");
var app = express();
var cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User");
const Places = require("./models/Places");
const Booking = require('./models/Booking');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const download = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
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

function getUserDataFromToken(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, async (err, userData) => {
      if (err) throw err;
      resolve(userData)
    })
  })
}

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
    jwt.verify(token, jwtSecret, async (err, userData) => {
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
  const uploadedPhotos = [];
  for (i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedPhotos.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedPhotos);
});

app.post("/places", (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price
  } = req.body;
  if (token) {
    jwt.verify(token, jwtSecret, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Places.create({
        owner: userData.id,
        title,
        address,
        photos,
        description,
        perks,
        extrainfo: extraInfo,//db not Camelcased
        checkin: checkIn,
        checkout: checkOut,
        maxguests: maxGuests,
        price
      });
      res.json(placeDoc);
    });
  }
});

app.get("/user-places", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, async (err, userData) => {
      if (err) throw err;
      const places = await Places.find({ owner: userData.id });
      res.json(places);
    });
  }
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Places.findById(id));
});

app.put("/places", (req, res) => {
  console.log('places put req')
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    photos,
    description,
    perks,
    extrainfo,
    checkin,
    checkout,
    maxguests,
    price
  } = req.body;

  if (token) {
    jwt.verify(token, jwtSecret, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Places.findById(id);
      // console.log(userData.id)
      // console.log(placeDoc.owner)
      if (userData.id === placeDoc.owner.toString()) {

        placeDoc.set({
          title,
          address,
          photos,
          description,
          perks,
          extrainfo,
          checkin,
          checkout,
          maxguests,
          price
        })
        placeDoc.save();
        res.json('place updated')
      }
    });
  }
});

app.get('/places', async (req, res) => {
  res.json(await Places.find({}))
})

app.post('/bookings', async (req, res) => {
  const userData = await getUserDataFromToken(req)
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } = req.body
  await Booking.create({
    place, userId: userData.id, checkIn, checkOut, numberOfGuests, name, phone, price
  }).then((doc) => {
    res.json(doc)
  }).catch((err) => {
    throw err
  })
}
)

app.get('/bookings', async (req, res) => {
  const userData = await getUserDataFromToken(req);
  res.json(await Booking.find({ userId: userData.id }).populate('place'))
})

app.get("/", (req, res) => {
  res.json("test");
})

app.listen(4000);

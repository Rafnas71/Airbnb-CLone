const express = require("express");
var app = express();
var cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User");
const Places = require("./models/Places");
const Booking = require("./models/Booking");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const download = require("image-downloader");
const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const mime = require("mime-types");

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "bookingabcdef";
const bucket = "booking-apppp";

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

async function uploadToS3(path, originalname, mimeType) {
  const Client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newFilename = Date.now() + "." + ext;
  // console.log({ path, originalname, mimeType });
  const data = await Client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Body: fs.readFileSync(path),
      Key: newFilename,
      ContentType: mimeType,
      ACL: "public-read",
    })
  );
  return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}

function getUserDataFromToken(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

app.post("/api/register", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
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

app.post("/api/login", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
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

app.get("/api/profile", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  }
});

app.post("/api/logout", (req, res) => {
  console.log("logout fn");
  res.cookie("token", "").json(true);
});

app.post("/api/upload-by-link", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { link } = req.body;
  const filename = "Photos" + Date.now() + ".jpg";
  console.log("here");
  await download.image({
    url: link,
    dest: "/tmp/" + filename,
  });

  const url = await uploadToS3(
    "/tmp/" + filename,
    filename,
    mime.lookup("/tmp/" + filename)
  );
  res.json(url);
});

const photosMiddleware = multer({ dest: "/tmp" });
app.post(
  "/api/upload",
  photosMiddleware.array("photos", 100),
  async (req, res) => {
    const uploadedPhotos = [];
    for (i = 0; i < req.files.length; i++) {
      const { path, originalname, mimetype } = req.files[i];
      const url = await uploadToS3(path, originalname, mimetype);
      uploadedPhotos.push(url);
    }
    res.json(uploadedPhotos);
  }
);

app.post("/api/places", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
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
    price,
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
        extrainfo: extraInfo, //db not Camelcased
        checkin: checkIn,
        checkout: checkOut,
        maxguests: maxGuests,
        price,
      });
      res.json(placeDoc);
    });
  }
});

app.get("/api/user-places", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, async (err, userData) => {
      if (err) throw err;
      const places = await Places.find({ owner: userData.id });
      res.json(places);
    });
  }
});

app.get("/api/places/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { id } = req.params;
  res.json(await Places.findById(id));
});

app.put("/api/places", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
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
    price,
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
          price,
        });
        placeDoc.save();
        res.json("place updated");
      }
    });
  }
});

app.get("/api/places", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  res.json(await Places.find({}));
});

app.post("/bookings", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromToken(req);
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;
  await Booking.create({
    place,
    userId: userData.id,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/api/bookings", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromToken(req);
  res.json(await Booking.find({ userId: userData.id }).populate("place"));
});

app.get("/", (req, res) => {
  res.json("test");
});

app.listen(4000);

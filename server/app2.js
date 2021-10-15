const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("./Card");
require("./Profile");
app.use(bodyParser.json());

const Card = mongoose.model("card");
const Profile = mongoose.model("profile");

const mongoUri =
  " mongodb+srv://LaserDenis:MmsmQg8LRObGWzTo@cluster0.wbxeg.mongodb.net/DATA?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log(`connected to mongo`);
});

mongoose.connection.on("error", (err) => {
  console.log("error", err);
});
app.get("/profile", (req, res) => {
  Profile.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/send-data-profile", (req, res) => {
  const profile = new Profile({
    username: req.body.username,
    email: req.body.email,
    picture: req.body.picture,
    password: req.body.password,
    userToken: req.body.userToken,
    avatarColor1: req.body.avatarColor1,
    avatarColor2: req.body.avatarColor2,
    profile: req.body.profile,
  });
  profile
    .save()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/delete-profile", (req, res) => {
  Profile.findByIdAndRemove(req.body.id)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/update-profile", (req, res) => {
  Profile.findByIdAndUpdate(req.body.id, {
    username: req.body.username,
    email: req.body.email,
    picture: req.body.picture,
    password: req.body.password,
    userToken: req.body.userToken,
    avatarColor1: req.body.avatarColor1,
    avatarColor2: req.body.avatarColor2,
    profile: req.body.profile,
  })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});



app.listen(3001, () => {
  console.log("server2 running");
});
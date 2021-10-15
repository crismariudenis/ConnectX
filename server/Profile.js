const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  username: String,
  email: String,
  picture: String,
  password: String,
  userToken: String,
  avatarColor1: String,
  avatarColor2: String,
  profile: String,
});

mongoose.model("profile", ProfileSchema);

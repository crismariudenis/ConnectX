const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  name: String,
  email: String,
  picture: String,
  password: String,
  userToken: String,
});

mongoose.model("profile", ProfileSchema);

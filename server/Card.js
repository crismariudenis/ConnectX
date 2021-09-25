const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  name: String,
  email: String,
  picture: String,
  imageUri: String,
  message: String,
  type: String,
});

mongoose.model('card', CardSchema);
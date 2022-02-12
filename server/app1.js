const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("./Card");
require('./Profile');
app.use(bodyParser.json());

const Card = mongoose.model("card");
const Profile = mongoose.model('profile');

const mongoUri =
  " mongodb+srv://LaserDenis:MmsmQg8LRObGWzTo@cluster0.wbxeg.mongodb.net/test?retryWrites=true&w=majority";
 
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
})

mongoose.connection.on('connected', () => {
    console.log(`connected to mongo`);
})

mongoose.connection.on("error", (err) => {
  console.log('error',err);
});
///----------------------------------------------------->Profile
app.get("/card", (req, res) => {
  Card.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/send-data-card', (req, res) => {
    const card = new Card({
      name: req.body.name,
      email: req.body.email,
      picture: req.body.picture,
      imageUri:req.body.imageUri,
      message:req.body.message,
      type:req.body.type,
    });
    card.save()
        .then(data => {
        console.log(data)
        res.send(data)
        }).catch(err => {
        console.log(err)
    })
})
app.post('/delete-card', (req, res) => {
  Card.findByIdAndRemove(req.body.id)
    .then(data => {
      console.log(data);
      res.send(data)
    }).catch(err => {
    console.log(err);
  })
})

app.post('/update-card', (req, res) => {
  Card.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    email: req.body.email,
    picture: req.body.picture,
    imageUri: req.body.imageUri,
    message: req.body.message,
    type: req.body.type,
  })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
})




app.listen(3000, () => {
  console.log("server1 running");
});

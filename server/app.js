const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("./Card");

app.use(bodyParser.json());

const Card = mongoose.model("card");


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

app.get("/", (req, res) => {
  Card.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/send-data', (req, res) => {
    const card = new Card({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      picture: req.body.picture,
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
app.post('/delete', (req, res) => {
  Card.findByIdAndRemove(req.body.id)
    .then(data => {
      console.log(data);
      res.send(data)
    }).catch(err => {
    console.log(err);
  })
})

app.post('/update', (req, res) => {
  Card.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    email: req.body.email,
    picture: req.body.picture,
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
  console.log("server running");
});

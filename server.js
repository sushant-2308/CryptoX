const express = require('express');
// const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const cors = require('cors');
var request = require('request')
const cookie_parser = require("cookie-parser");
const Asset = require("./src/models/Asset")
const User = require('./src/models/User');
// global.user_id = require('user_id')

const app = express();
app.use(cookie_parser());


// const corsOption = {
//   origin: ['http://localhost:3000'],
// };

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000"
    ],
    credentials: true
  })
);


// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.use('/', function(req, res) {
//   var url = 'http://' +
//     req.get('host').replace('localhost:3000') + 
//     req.url
//   req.pipe(request({ qs:req.query, uri: url })).pipe(res);
// }) 

// app.use(cors())
// Passport Config
require('./src/config/passport')(passport);

// DB Config
const db = require('./src/config/keys').mongoURI;

// // EJS
// app.use(expressLayouts);
// app.set('view engine', 'ejs');

app.use(express.json());

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/login', require('./src/routes/index.js'));
app.use('/users', require('./src/routes/users.js'));

app.post("/addAssets", async (req, res) => {
  console.log(req.body);

  for (const assetJSON of req.body) {
    let newAsset = new Asset({
      symbol: assetJSON.symbol,
      name: assetJSON.name,
      current_price: assetJSON.current_price,
      high_24h: assetJSON.high_24h,
      low_24h: assetJSON.low_24h,
      price_change_24h: assetJSON.price_change_24h,
      price_change_percentage_24h: assetJSON.price_change_percentage_24h,
      image: assetJSON.image,
      last_updated: assetJSON.last_updated,
    })

    newAsset.save()
      .then(() => {
        console.log("asset saved");
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send("error");
      });
    }
    res.status(200).send("Added Assets");
  });

app.post("/orders", async (req, res) => {
  console.log(req.body);
  // const order = req.body;
  // User
  // .findOne({ Id: Login.user_id })
  console.log(global.user_id)
  // .exec()
  await User
      .findOneAndUpdate({_id: global.user_id} ,{
        coin : req.body.coin,
        quantity : req.body.quantity,
        totalINR : req.body.totalINR,
      }, {
        returnOriginal: false
      })
      .then(() => {
        console.log("Orders saved");
        res.status(200).send("Added Order delta");
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send("error");
      });
      
});

const PORT = process.env.PORT || 3002;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => app.listen(PORT, console.log(`Server running on  ${PORT}`))
  )
  .catch(err => console.log(err));



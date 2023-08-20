const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Fooddata = require("./Modal/schema");
const dotenv = require('dotenv')
const cookieParser = require("cookie-parser")

dotenv.config({
  path : "./config.env"
})

app.use(cookieParser());

const DATABASE = process.env.DATABASE

const DB =
      DATABASE
  mongoose.set("strictQuery", true);

mongoose
  .connect(DB, {})
  .then(() => {
    console.log("Correction Successful");
  })
  .catch((err) => {
    console.log("no Correction");
  });

  app.use(express.json())

  app.use(require("./auths"));


app.listen(3005 , (req , res) => {
  // res.json("sidit")
  console.log("sidit");
})

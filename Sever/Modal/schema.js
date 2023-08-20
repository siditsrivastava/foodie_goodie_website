const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  dishname: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
  },
});

const Fooddata = mongoose.model("FOODDATA", schema);

module.exports = Fooddata;

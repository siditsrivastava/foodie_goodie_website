const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
// const Secertkey = require('../')
dotenv.config({
  path: "../config.env",
});
const SECERTKEY = process.env.SECERTKEY;  

const registationSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  useremail: {
    type: String,
  },
  usernumber: {
    type: Number,
  },
  userpassword: {
    type: String,
  },
  userconfirmpassword: {
    type: String,
  },
  userorderdata :
   [
      {
        dishid:{
          type:String
        },
        dishnames: {
          type: String,
        },
        price: {
          type: Number,
        },
      }  
  ],
  tokens: [
    {
      token: {
        type:String
      },
    },
  ],
});

registationSchema.pre("save", async function (next) {
  if (this.isModified("userpassword")) {
    this.userpassword = await bcrypt.hash(this.userpassword, 12);
    this.userconfirmpassword = await bcrypt.hash(this.userconfirmpassword, 12);
  }
  next();
});

registationSchema.methods.generateAuthToken = async function () {
  try {
    token = jwt.sign({ _id: this.id }, process.env.SECERTKEY);
    this.tokens = this.tokens.concat({token:token});
    await this.save();
    return token
  } catch (err) {
    console.log(err);
  }
};

registationSchema.methods.addcart = async function(dishnames , price , dishid){

  try{
    this.userorderdata = this.userorderdata.concat({dishnames , price , dishid});
    await this.save();
    return this.userorderdata;

  }catch(err){
    console.log(err)
  }

}

const Userregistation = mongoose.model("USERREGISTATION", registationSchema);

module.exports = Userregistation;

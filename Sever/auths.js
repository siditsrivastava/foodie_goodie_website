const express = require("express");
const router = express.Router();
const Fooddata = require("./Modal/schema");
const cors = require("cors");
const Userregistation = require("./Modal/registationSchema");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
// const jwt = require("JsonWebToken");
const authentication = require("./Middleware/authentication");
const userCart = require('./Modal/cartSchema')

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

router.use(cors(corsOptions));

router.post("/", async (req, res) => {
  const { dishname, price, description, quantity } = req.body;

  if (!dishname || !price || !description || !quantity) {
    return res
      .status(422)
      .json({ error: "Please Provide the All data Correctly !! " });
  }

  try {
    const Fooddetails = await Fooddata.create();
    // if (Fooddetails) {
    //   return res.status(422).json({ error: "This Value is already Use " });
    // }
    const allFoodData = new Fooddata({
      dishname,
      price,
      description,
      quantity,
    });

    await allFoodData.save();
    return res.status(201).json({ message: "User successfully rgister" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/registation", async (req, res) => {
  const { username, useremail, usernumber, userpassword, userconfirmpassword } =
    req.body;
  if (
    (!username, !useremail, !usernumber, !userpassword, !userconfirmpassword)
  ) {
    return res.status(422).json({ error: "Please Provide All the Data" });
  }
  try {
    const useralldata = await Userregistation.findOne({ useremail: useremail });
    if (useralldata) {
      return res.status(422).json({ error: "Email Is already Used" });
    }

    const userallregistationdata = new Userregistation({
      username,
      useremail,
      usernumber,
      userpassword,
      userconfirmpassword,
    });

    await userallregistationdata.save();

    console.log(`${userallregistationdata} user Registation Successfully`);
    return res.status(201).json({ message: "User Registation Successfully" });
  } catch (e) {
    console.log(e);
  }
});

// router.post("/carts",authentication,async (req, res) => {

//      try{
//       const {dishnames , price , dishid} = req.body;
//       const usercontent = await Userregistation.findOne({_id : req.userID})
//       // const usercontents = await Userregistation.findOne({dishnames})
//       // if(usercontents){
//       //   return res.status(422).json({ error: "This is already added" });
//       // }
//       const checkorderdata = await Userregistation.findOne({dishid : dishid});
//       if(usercontent || checkorderdata){
//         const userfood =  await usercontent.addcart(dishnames , price , dishid);
//         await usercontent.save();
//         res.status(201).json({message : "Add Successfuuly"})
//       }  
//      }catch(er){
//       console.log(er)
//      }
// })
router.get('/orderdata' , authentication, async(req, res) => {

  try{

    const userLogin = await userCart.findByIdAndUpdate({_id : req.userID})
 

  }catch(err){
      console.log(err)
  }
  

})

router.post("/login", async (req, res) => {
  try {
    const { useremail, userpassword } = req.body;

    if (!useremail || !userpassword) {
      return res.status(400).json({ error: "Please Provide the Data" });
    }

    const userfindData = await Userregistation.findOne({
      useremail: useremail,
    });

    if (userfindData) {
      const isMatchPassword = await bcrypt.compare(
        userpassword,
        userfindData.userpassword
      );

     const token = await userfindData.generateAuthToken();

      res.cookie( "jwtoken" , token, {
        expires : new Date(Date.now() + 1200000000),
        httpOnly :true
      });
      if (isMatchPassword) {
        res.status(200).json({ message: "Login Successfully" });
      } else {
        res.status(422).json({ message: "Invalid Email" });
      }
    } else {
      res.status(400).json({ Error: "Invalid Credientials" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("", async(req, res) => {
  let result =  await Fooddata.find();
  if (result) {
    res.send(result);   
  } else {
    res.send({ error: "NO DATA FOUND" });
  }
 
});

// router.get('/orderdata' , authentication, (req, res) => {

  

// })

router.get('/sidi' , authentication,  (req, res) => {
  res.send(req.rootUser)
})

router.get('/addcart' , authentication,  (req, res) => {
  res.send(req.rootUser)
})

router.get("/logout" ,  (req, res) => {
  res.clearCookie('jwtoken' )
  res.status(200).send("User Logout")
})

module.exports = router;







  //   try {
  //     const {dishname, price} = req.body ;
  //     const usercontent = await Userregistation.findOne({_id : req.userID})
  //     if(usercontent){        
  //     const cartdata = await userCart.create({
  //       dishname,
  //       price,
  //     });
  //     await cartdata.save();
  //     return res.status(201).json({ message: "User successfully rgister" });
  //   }
  // }
  //   catch(err){
  //       console.log(err);
  //   }
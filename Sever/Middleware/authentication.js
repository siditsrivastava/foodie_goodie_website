
const jwts = require('jsonwebtoken')
const Userregistation = require("../Modal/registationSchema")

const SECERTKEY = process.env.SECERTKEY;

const authentication = async(req, res , next) => {

    try {
        const token = req.cookies.jwtoken;
        const verifyToken = await jwts.verify(token, process.env.SECERTKEY)
        const rootUser = await Userregistation.findOne({_id : verifyToken._id , "tokens.token" : token})
        if(!rootUser){
            throw new Error( "User Not Found")
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id
        req.userEmail = rootUser.email
        next();
    }
    catch(err) {
    }
}

 module.exports = authentication
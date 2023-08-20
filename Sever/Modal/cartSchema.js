const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({ 
    email : {
        type : String
    },
    OrderData : {
        type : Array
    }
})

const userCart = mongoose.model("USERCART", cartSchema)

module.exports = userCart;
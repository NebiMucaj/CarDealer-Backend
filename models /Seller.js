const mongoose = require('mongoose')
const sellerSchema = mongoose.Schema({
    country:String,
    plz:Number,
    city: String,
    role:String,
    name:String,
    imgsrc:String,
    stars:Number,
    email:String,
    tel:String,
    link:String
  
  
  
  }
 
)
module.exports = mongoose.model('Seller', sellerSchema)
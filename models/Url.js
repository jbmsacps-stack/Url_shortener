<<<<<<< HEAD
const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Url', urlSchema);
=======
const mongoose=require("mongoose");
const UrlSchema=new mongoose.Schema({
    originalUrl:String,
    shortId:String,
    clicks:{
        type:Number,
        default:0
    }
});
module.exports=mongoose.model("Url",UrlSchema);
>>>>>>> 58ce4b2c38cec651f262571b62911c6863545784

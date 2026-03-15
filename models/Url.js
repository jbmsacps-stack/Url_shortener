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
const express=require("express");
const router=express.Router();
const shortid=require("shortid");
const Url=require("../models/Url");
router.post("/shorten",async (req,res)=>{
    const {originalUrl}=req.body;
    const shortId=shortid.generate();
    const newUrl=new Url({
        originalUrl:originalUrl,
        shortId:shortId
    });
    await newUrl.save();
    res.send({
        shortUrl:"http://localhost:5000/"+shortId
    });
});
module.exports=router;
router.get("/:shortId",async (req,res)=>{
    const {shortId}=req.params;
    const url=await Url.findOne({shortId:shortId});
    if(url){
        url.clicks++;
        await url.save();
        res.redirect(url.originalUrl);
    }else{
        res.send("URL not found");
    }
});
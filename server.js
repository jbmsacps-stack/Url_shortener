const mongoose=require("mongoose");
const express=require("express");
const path=require("path");
const app=express();
const urlRoutes = require("./routes/urlRoutes");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/", urlRoutes);

app.use(express.static(path.join(__dirname,"public")));

mongoose.connect("mongodb://127.0.0.1:27017/urlShortener")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.listen(5000,()=>{
    console.log("Server running on http://localhost:5000");
})
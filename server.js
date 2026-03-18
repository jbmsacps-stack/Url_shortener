<<<<<<< HEAD
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // serve HTML/CSS/JS

// Routes
const urlRoutes = require('./routes/url');
app.use('/api', urlRoutes);     // POST /api/shorten
app.use('/', urlRoutes);        // GET /:code (redirect)

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error('MongoDB error:', err));
=======
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
>>>>>>> 58ce4b2c38cec651f262571b62911c6863545784

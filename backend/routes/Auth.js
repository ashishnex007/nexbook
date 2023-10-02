const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const { MongoError } = require('mongodb')
const router = express.Router();
const User = require("../models/User");
const userFetch = require("../middleware/userFetch")
const mongoose = require("mongoose");
const { query,body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const token = jwt.sign({ foo: 'bar' }, 'shhhhh');

const JWT_SECRET = "AshishNexWillRuleTheWorld"

// Connect to MongoDB Atlas
mongoose.connect(
  "mongodb+srv://ashishnex007:kaavya12@cluster0.an7mzge.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", (error) => console.error("MongoDB connection error:", error));
db.once("open", () => console.log("Connected to MongoDB Atlas"));

router.post("/createUser",[
  body('name',"enter a valid name").isLength({min:3}),
  body('email',"enter a valid email").notEmpty().isEmail(),
  body('password',"enter a valid password").isLength({min:5})
], async (req, res) => {
  let success=false;
  try {
    const result = validationResult(req);
  if (result.isEmpty()) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hashSync(req.body.password, salt)
    const user = new User({
      name:req.body.name,
      email:req.body.email,
      password:hash,
    });
    const data = {
      user:{
        id: user.id
      }
    }
    const authToken = jwt.sign(data,JWT_SECRET)
    await user.save();
    success=true;
    res.json({success,authToken})
    console.log('User created successfully');
  }
  else{
    res.send({ "validation errors": result.array() });
  }
  } catch (error) {
    if (error.message.includes('duplicate key error')) {
      console.error('Duplicate key error:', error);
      res.status(400).json({success,error: "Email already exists" });}
       else {
      console.error('Error creating user:', error);
      res.status(500).json({success, error: "Internal server error"});
    }
  }
});

//login Endpoint

router.post("/login",[
  body('email',"enter a valid email").isEmail(),
  body('password',"password can't be blank").exists()
], async (req, res) => {
  let success=false;
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({error:"Enter right credentials"})
  }
  const {email,password} = req.body;
  try {
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({error:"Enter proper credentials"})
    }
    const passwordCompare = await bcrypt.compare(password,user.password)
    if(!passwordCompare){
      return res.status(400).json({success,error:"Enter proper credentials"})
    }
    const data = {
      user:{
        id: user.id
      }
    }
    
    const authToken = jwt.sign(data,JWT_SECRET)
    success=true;
    res.json({success,authToken});
    console.log("login successful with authToken "+authToken.slice(0,10)+"...")
    console.log("Welcome "+user.name)
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
  }
})

// get user details

router.post("/getUser", userFetch , async (req, res) => {

try {
  userId = req.user.id
  const user = await User.findById(userId).select("-password")
  res.send(user)
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server error");
}
})

module.exports = router;

const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


// Register
router.post("/register", (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    passwort: req.body.passwort
  });

  User.addUser(newUser)
    .then(user => {
      res.json({success: true, msg: "User registered"});      
    })
    .catch(err => {
      res.json({success: false, msg: "Failed to register user"});
    });
});

// Authenticate
router.get("/authenticate", (req, res, next) => {
  res.send("authenticate");
});

// Profile
router.get("/profile", (req, res, next) => {
  res.send("profile");
});

module.exports = router;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/database");

// user schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  passwort: {
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model("User", UserSchema);

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback) {
  const query = {username: username};
  User.findByOne(query, callback);
};

module.exports.addUser = function(newUser) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.passwort, salt, (err, hash) => {
        if(err) reject(err);
        newUser.passwort = hash;
        newUser.save().then((doc) => {
          resolve(doc);
        });
      });
    });
  });
  
};
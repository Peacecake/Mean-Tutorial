const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

// Connect to mongodb database
mongoose.Promise = global.Promise;
mongoose.connect(config.database, {
  useMongoClient: true
}).then((db) => {
  console.log("connected to " + db.name);
}).catch((err) => {
  console.log("database error " + err);
});

const app = express();

const users = require("./routes/users");

const port = 3000;

// CORS Middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

// Routing
app.use("/users", users);

// index route
app.get("/", (request, response) => {
  response.send("invalid endpoint");
});

app.get("*", (request, response) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Start server
app.listen(port, () => console.log("Server startet on port " + port));
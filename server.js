const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
require("./config/database.js");

const app = express();

// allow cross origin access - client from any source can make requests to server
app.use(
  cors({
    origin: "*",
  })
);

// logs the different requests to the server
app.use(logger("dev"));

// parse stringified objects (JSON)
app.use(express.json());

// serve build folder
app.use(express.static(path.join(__dirname, "build")));

// ROUTES

// database signup route
app.post("/api/users", (req, res) => {
  console.log(req.body);
  // do auth

  // send user response
  res.json("good route");
});

// catch-all route for get requests, must be last in route list
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// tell server where to listen. Must not be 3000 as React listens there.
app.listen(5000, () => {
  console.log(`Server is Listening on 5000`);
});

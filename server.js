const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const passport = require("passport");
const session = require("express-session");
const initializePassport = require("./config/passport-config");
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

initializePassport(
  passport,
  // passport wants a function that will return the correct user, given an email or id
  async (email) => {
    let user = User.findOne({ email: email });
    return user;
  },
  async (id) => {
    let user = User.findById(id);
    return user;
  }
);

app.use(
  session({
    secure: true,
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { originalMaxAge: 3600000, sameSite: "strict" }, // session times out after an hour, user must log in again
  })
);

// serve build folder
app.use(express.static(path.join(__dirname, "build")));

// ROUTES

app.get("/session-info", (req, res) => {
  res.json({
    session: req.session,
  });
});

// database signup route
app.post("/users/signup", async (req, res) => {
  let hashedPassword = await bcrypt.hash(req.body.password, 10);
  // use User model to place user in database
  let userFromCollection = await User.create({
    email: req.body.email,
    name: req.body.name,
    password: hashedPassword,
  });
  console.log(userFromCollection);
  res.json("user created");
});

// database login route
app.put("/users/login", async (req, res, next) => {
  console.log(req.body);
  // passport authentication
  passport.authenticate("local", (error, user, message) => {
    console.log("message from passport config: ", message);
    if (error) throw error;
    if (!user) {
      res.json({
        message: "login failed",
        user: false,
      });
    } else {
      // now that user is authenticated, add user to express session with express session's logIn method
      req.logIn(user, (error) => {
        if (error) throw error;
        res.json({
          message: "successfully authenticated",
        });
      });
    }
  })(req, res, next);
});

// catch-all route for get requests, must be last in route list
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// tell server where to listen. Must not be 3000 as React listens there.
app.listen(5000, () => {
  console.log(`Server is Listening on 5000`);
});

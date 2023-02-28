const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const bcrypt = require("bcrypt");

const passport = require("passport");
const session = require("express-session");
const initializePassport = require("./config/passport-config");

require("dotenv").config();
require("./config/database.js");

const User = require("./models/user");
const Category = require("./models/category");
const Item = require("./models/item");
const Order = require("./models/order");

const PORT = 5000;

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
    // session times out after an hour, user must log in again
    cookie: { originalMaxAge: 3600000, sameSite: "strict" },
  })
);

// serve build folder
app.use(express.static(path.join(__dirname, "build")));

// ********************************************************* \\
// ************************* ROUTES ************************ \\
// ********************************************************* \\

app.get("/get_categories", async (req, res) => {
  let arrayOfCategories = await Category.find();
  res.json(arrayOfCategories);
});

app.get("/get_items", async (req, res) => {
  let arrayOfItems = await Item.find().populate("category");
  res.json(arrayOfItems);
});

app.get("/session-info", (req, res) => {
  res.json({
    session: req.session,
  });
});

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

app.put("/users/login", async (req, res, next) => {
  passport.authenticate("local", (error, user, message) => {
    console.log("message from passport config: ", message);
    if (error) throw error;
    if (!user) {
      res.json({
        message: "login failed",
        user: false,
      });
    } else {
      // add user to express session with express session's logIn method
      req.logIn(user, (error) => {
        if (error) throw error;
        res.json({
          message: "successfully authenticated",
        });
      });
    }
  })(req, res, next);
});

app.get("/get_cart", async (req, res) => {
  let cart = await Order.getCart(req.session.passport.user._id);
  res.json(cart);
});

app.put("/add_to_cart/:itemId", async (req, res) => {
  let { itemId } = req.params;
  let userId = req.session.passport.user._id;
  let cart = await Order.getCart(userId);

  console.log(cart);

  const orderItem = cart.orderItems.find((orderItem) =>
    orderItem.item._id.equals(itemId)
  );

  if (orderItem) {
    orderItem.qty += 1;
  } else {
    const item = await Item.findById(itemId);

    console.log(item);

    cart.orderItems.push({
      qty: 1,
      item,
    });
  }
  cart.save();
  res.send(cart);
});

app.put("/change_qty", async (req, res) => {
  let { itemId, newQty } = req.body;
  let userId = req.session.passport.user._id;
  console.log(userId);

  let cart = await Order.getCart(userId);
  const orderItem = cart.orderItems.find((orderItem) => {
    console.log(orderItem.item, itemId);
    if (orderItem.item._id.equals(itemId)) {
      return orderItem;
    } else {
      return null;
    }
  });
  console.log(orderItem);
  orderItem.qty = newQty;

  if (orderItem.qty === 0) {
    orderItem.remove();
  }

  cart.save();
  res.send(cart);
});

app.put("/checkout", async (req, res) => {
  let cart = await Order.getCart(req.session.passport.user._id);

  cart.checkoutDone = true;
  cart.save();

  res.send(cart);
});

// catch-all route for get requests, must be last in route list
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// tell server where to listen. Must not be 3000 as React listens there.
app.listen(PORT, () => {
  console.log(`Server is Listening on ${PORT}`);
});

const mongoose = require("mongoose");
const itemSchema = require("./itemSchema");

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;

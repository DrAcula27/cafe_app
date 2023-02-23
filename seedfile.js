require("dotenv").config();
require("./config/database");

const Category = require("./models/category");
const Item = require("./models/item");

(async function () {
  await Category.deleteMany({});
  const categories = await Category.create([
    { name: "Sandwiches", sortOrder: 10 },
    { name: "Seafood", sortOrder: 20 },
    { name: "Mexican", sortOrder: 30 },
    { name: "Italian", sortOrder: 40 },
    { name: "Sides", sortOrder: 50 },
    { name: "Desserts", sortOrder: 60 },
    { name: "Drinks", sortOrder: 70 },
  ]);

  await Item.deleteMany({});
  const items = await Item.create([
    {
      name: "Hamburger",
      emoji: ":hamburger:",
      category: categories[0],
      price: 5.95,
    },
    {
      name: "Turkey Sandwich",
      emoji: ":sandwich:",
      category: categories[0],
      price: 6.95,
    },
    {
      name: "Hot Dog",
      emoji: ":hotdog:",
      category: categories[0],
      price: 3.95,
    },
    {
      name: "Crab Plate",
      emoji: ":crab:",
      category: categories[1],
      price: 14.95,
    },
    {
      name: "Fried Shrimp",
      emoji: ":fried_shrimp:",
      category: categories[1],
      price: 13.95,
    },
    {
      name: "Whole Lobster",
      emoji: ":lobster:",
      category: categories[1],
      price: 25.95,
    },
    { name: "Taco", emoji: ":taco:", category: categories[2], price: 1.95 },
    {
      name: "Burrito",
      emoji: ":burrito:",
      category: categories[2],
      price: 4.95,
    },
    {
      name: "Pizza Slice",
      emoji: ":pizza:",
      category: categories[3],
      price: 3.95,
    },
    {
      name: "Spaghetti",
      emoji: ":spaghetti:",
      category: categories[3],
      price: 7.95,
    },
    {
      name: "Garlic Bread",
      emoji: ":bread:",
      category: categories[3],
      price: 1.95,
    },
    {
      name: "French Fries",
      emoji: ":fries:",
      category: categories[4],
      price: 2.95,
    },
    {
      name: "Green Salad",
      emoji: ":green_salad:",
      category: categories[4],
      price: 3.95,
    },
    {
      name: "Ice Cream",
      emoji: ":ice_cream:",
      category: categories[5],
      price: 1.95,
    },
    {
      name: "Cup Cake",
      emoji: ":cupcake:",
      category: categories[5],
      price: 0.95,
    },
    {
      name: "Custard",
      emoji: ":custard:",
      category: categories[5],
      price: 2.95,
    },
    {
      name: "Strawberry Shortcake",
      emoji: ":cake:",
      category: categories[5],
      price: 3.95,
    },
    {
      name: "Milk",
      emoji: ":glass_of_milk:",
      category: categories[6],
      price: 0.95,
    },
    { name: "Coffee", emoji: ":coffee:", category: categories[6], price: 0.95 },
    {
      name: "Mai Tai",
      emoji: ":tropical_drink:",
      category: categories[6],
      price: 8.95,
    },
    { name: "Beer", emoji: ":beer:", category: categories[6], price: 3.95 },
    {
      name: "Wine",
      emoji: ":wine_glass:",
      category: categories[6],
      price: 7.95,
    },
  ]);
  console.log(items);
  process.exit();
})();

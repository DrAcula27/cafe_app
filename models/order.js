const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const itemSchema = require("./itemSchema");

const orderItemSchema = new Schema(
  {
    qty: { type: Number, default: 1 },
    item: itemSchema,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

orderItemSchema.virtual("totPrice").get(function () {
  return this.qty * this.item.price;
});

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    checkoutDone: { type: Boolean, default: false },
    orderItems: [orderItemSchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

orderSchema.virtual("orderTotal").get(function () {
  let accumulatedTotal = this.orderItems.reduce((total, item) => {
    return total + item.totPrice;
  }, 0);
  return +accumulatedTotal.toFixed(2);
});

orderSchema.virtual("totalQty").get(function () {
  let accumulatedTotal = this.orderItems.reduce((total, item) => {
    return total + item.qty;
  }, 0);
  return accumulatedTotal;
});

orderSchema.statics.getCart = function (userId) {
  return this.findOneAndUpdate(
    { user: userId, checkoutDone: false },
    { user: userId },
    { upsert: true, new: true }
  );
};

module.exports = mongoose.model("Order", orderSchema);

const { ServerMonitoringMode } = require("mongodb");
const mongoose = require("mongoose");

//schema of a product
const orderSchema = mongoose.Schema({
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
      required: true,
    },
  ],
  shippingAddress1: {
    type: String,
    required: true,
  },
  shippingAddress2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  totalPrice: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});

// Add a virtual 'id' field to the order schema
orderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Configure toJSON to include virtual properties
orderSchema.set("toJSON", {
  virtual: true,
});

//model in nudeJS = collection in MongoDB
//module.exports=mongoose.model('Order',orderSchema);
exports.Order = mongoose.model("Order", orderSchema);

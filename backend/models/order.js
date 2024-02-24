const mongoose = require("mongoose");

//schema of a product
const orderSchema = mongoose.Schema({});

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

const mongoose = require("mongoose");

//schema of a product
const orderItemSchema = mongoose.Schema({
  quantity: [
    {
      type: Number,
      required: true,
    },
  ],
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

// Add a virtual 'id' field to the order schema
orderItemSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Configure toJSON to include virtual properties
orderItemSchema.set("toJSON", {
  virtual: true,
});

//model in nudeJS = collection in MongoDB
//module.exports=mongoose.model('Order',orderSchema);
exports.orderItem = mongoose.model("OrderItem", orderItemSchema);

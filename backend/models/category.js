const mongoose = require("mongoose");

//schema of a product
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
});

// Add a virtual 'id' field to the category schema
categorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Configure toJSON to include virtual properties
categorySchema.set("toJSON", {
  virtual: true,
});

//model in nudeJS = collection in MongoDB
//module.exports=mongoose.model('Category',categorySchema);
exports.Category = mongoose.model("Category", categorySchema);

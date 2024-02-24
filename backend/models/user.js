const mongoose = require("mongoose");

//schema of a product
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  street: {
    type: String,
    default: "",
  },
  apartment: {
    type: String,
    default: "",
  },
  zip: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
});

// Add a virtual 'id' field to the user schema
userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Configure toJSON to include virtual properties
userSchema.set("toJSON", {
  virtual: true,
});

//model in nudeJS = collection in MongoDB
exports.User = mongoose.model("User", userSchema);
exports.userSchema = userSchema;

//module.exports=mongoose.model('User',userSchema);

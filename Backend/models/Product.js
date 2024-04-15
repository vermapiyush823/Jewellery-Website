const mongoose = require("mongoose");
const { Schema } = mongoose;
const ProductSchema = new Schema({
  name: String,
  price: Number,
  category: String,
  image: String,
  rating: Number,
  type: String,
  description: String,
  gender: String,
  weight: Number,
});

module.exports = mongoose.model("product", ProductSchema);

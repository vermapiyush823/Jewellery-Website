const Product = require("../models/Product");

const addProduct = async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product = products.slice(-1)[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const newProduct = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    weight: req.body.weight,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  try {
    const product = await newProduct.save();
    res.status(201).json({
      success: 1,
      message: "Product added successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const removeProduct = async (req, res) => {
  const id = req.body.id;
  try {
    const product = await Product.findOneAndDelete({ id: id });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNewCollections = async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(0, -10);
  console.log("New Collection Fetched");
  res.send(newcollection);
};

const getPopularProducts = async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popular = products.slice(0, 4);
  console.log("Popular Fetched");
  res.send(popular);
};

module.exports = {
  addProduct,
  removeProduct,
  getAllProducts,
  getNewCollections,
  getPopularProducts,
};

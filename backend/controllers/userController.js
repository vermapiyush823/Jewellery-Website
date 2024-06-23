// userController.js

const Users = require("../models/User");
const jwt = require("jsonwebtoken");

// User Signup
const signup = async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    res.status(400).json({
      success: false,
      errors: "User already exists",
    });
    return;
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.usermame,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();
  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
};

const login = async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({
      success: false,
      errors: "Email does not exist",
    });
  }
  if (user.password === req.body.password) {
    const data = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(data, "secret_ecom");
    return res.json({ success: true, token });
  } else {
    return res.status(400).json({
      success: false,
      errors: "Invalid credentials",
    });
  }
};

// Add to Cart
const addToCart = async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.id] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Added to cart");
  console.log({
    ItemId: req.body.id,
    user: req.user.id,
  });
};

// Remove from Cart
const removeFromCart = async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.id] > 0) {
    userData.cartData[req.body.id] -= 1;
    await Users.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );
  }
  res.send("Removed from cart");
  console.log({
    ItemId: req.body.id,
    user: req.user.id,
  });
};

// Get Cart
const getCart = async (req, res) => {
  console.log("Get Cart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
};

module.exports = {
  signup,
  login,
  addToCart,
  removeFromCart,
  getCart,
};

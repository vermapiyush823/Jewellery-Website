// userRoutes.js

const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  addToCart,
  removeFromCart,
  getCart,
} = require("../controllers/userController");
const fetchUser = require("../middlewares/authMiddleware");

// User registration
router.post("/signup", signup);

// User login
router.post("/login", login);

// Cart operations
router.post("/cart/add", fetchUser, addToCart);
router.post("/cart/remove", fetchUser, removeFromCart);
router.post("/cart", fetchUser, getCart);

module.exports = router;

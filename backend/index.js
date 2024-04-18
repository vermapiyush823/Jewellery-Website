const port = 4000;
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const { cp } = require("fs");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Database connection with mongoDB
mongoose
  .connect(
    "mongodb+srv://vermapiyush823:vermapiyush823@cluster0.lsqoit0.mongodb.net/shree-balaji-jwellers"
  )
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log("Error while connecting to database");
  });

app.get("/", (req, res) => {
  res.send("Hello from server");
});

//  Image Storage Engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Creating endpoint for uploading image
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    path: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Schema for creating products
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

// Creating api for adding product
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
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
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Creating api for removing product
app.post("/removeproduct", async (req, res) => {
  const id = req.body.id;
  try {
    const product = await Product.findOneAndDelete({ id: id });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Creating api for getting all products
app.get("/allproducts", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/product/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findOne({ id: id });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(port, (error) => {
  if (error) {
    console.log("Error while starting the server");
  } else console.log(`Server is running on port ${port}`);
});

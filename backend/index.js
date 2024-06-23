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
    res.status(201).json({
      success: 1,
      message: "Product added successfully",
    });
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

// creating user schema
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// creating endpoint for user registration
app.post("/signup", async (req, res) => {
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
});

// creating endpoint for user login
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).json({
      success: false,
      errors: "Email does not exist",
    });
    return;
  }
  if (user.password === req.body.password) {
    const data = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(data, "secret_ecom");
    res.json({ success: true, token });
  } else {
    res.status(400).json({
      success: false,
      errors: "Invalid credentials",
    });
  }
});

// Creating end point for new collection data
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(0, -10);
  console.log("New Collection Fetched");
  res.send(newcollection);
});

// creating endpoint for popular in women category
app.get("/popular", async (req, res) => {
  let products = await Product.find({
    category: "women",
  });
  let popular = products.slice(0, 4);
  console.log("Popular Fetched");
  res.send(popular);
});

// creating middleware to fetch user
const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ errors: "Auth Error" });
  } else {
    try {
      const decoded = jwt.verify(token, "secret_ecom");
      req.user = decoded.user;
      next();
    } catch (error) {
      res.status(401).send({ errors: "Invalid Token" });
    }
  }
};

// creating endpoint for adding product to cartdata
app.post("/addtocart", fetchUser, async (req, res) => {
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
});
// creating endpoint for removing product from cartdata
app.post("/removefromcart", fetchUser, async (req, res) => {
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
});

// creating endpoint for fetching cartdata
app.post("/getcart", fetchUser, fetchUser, async (req, res) => {
  console.log("Get Cart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

app.listen(port, (error) => {
  if (error) {
    console.log("Error while starting the server");
  } else console.log(`Server is running on port ${port}`);
});

// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const config = require("./config");

// const app = express();
// const port = config.port;

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json());

// app.use("/images", express.static("upload/images"));

// const productRoutes = require("./routes/productRoutes");
// const userRoutes = require("./routes/userRoutes");

// app.use("/api/products", productRoutes);
// app.use("/api/users", userRoutes);

// mongoose
//   .connect(config.mongoURI)
//   .then(() => {
//     console.log("Database connected successfully");
//   })
//   .catch((error) => {
//     console.log("Error while connecting to database", error);
//   });

// app.get("/", (req, res) => {
//   res.send("Hello from server");
// });

// app.listen(port, (error) => {
//   if (error) {
//     console.log("Error while starting the server");
//   } else console.log(`Server is running on port ${port}`);
// });

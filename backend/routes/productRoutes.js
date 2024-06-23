const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  addProduct,
  removeProduct,
  getAllProducts,
  getNewCollections,
  getPopularProducts,
} = require("../controllers/productController");

// Image Storage Engine
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
router.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    path: `http://localhost:4000/images/${req.file.filename}`,
  });
});

// Creating api for product operations
router.post("/add", addProduct);
router.post("/remove", removeProduct);
router.get("/all", getAllProducts);
router.get("/newcollections", getNewCollections);
router.get("/popular", getPopularProducts);

module.exports = router;

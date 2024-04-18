const port = 4000;
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

app.use(cors());
app.use(express.json());

// Database connection with mongoDB
mongoose
  .connect(
    "mongodb+srv://vermapiyush823:vermapiyush823@cluster0.lsqoit0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/shree-balaji-jwellers"
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

// Crreating endpoint for uploading image
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    path: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

app.listen(port, (error) => {
  if (error) {
    console.log("Error while starting the server");
  } else console.log(`Server is running on port ${port}`);
});

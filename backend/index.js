const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");

const app = express();
const port = config.port;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/images", express.static("upload/images"));

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log("Error while connecting to database", error);
  });

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(port, (error) => {
  if (error) {
    console.log("Error while starting the server");
  } else console.log(`Server is running on port ${port}`);
});

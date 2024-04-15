const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const URL = process.env.MONGO_URL;
mongoose.set("strictQuery", true);

const connectToMongo = async () => {
  try {
    let db = await mongoose.connect(URL, {
      useNewUrlParser: true,
    });
    console.log("Connected to Mongo");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToMongo;

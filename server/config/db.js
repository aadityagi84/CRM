const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

const db = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL);
    if (conn) {
      console.log("Database connected successfully");
    }
    return conn;
  } catch (error) {
    console.log(error);
  }
};

module.exports = db;

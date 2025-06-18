const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const db = require("./config/db");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
db();
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.use("/api/users", userRoute);
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

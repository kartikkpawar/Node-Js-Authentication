require("dotenv").config();
const mongoose = require("mongoose");

// connecting mongoose to db
mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to DB"));

db.once("open", function () {
  console.log("DB Connected");
});

module.exports = db;

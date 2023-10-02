const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
require('dotenv').config();

const port = process.env.PORT || 8080;
const app = express();

// connect with db
require("./db/conn");

// middlewares
app.use(logger("dev"));
app.use(bodyParser.json({ extended: false }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

//start
app.get("/", (req, res) => {
  res.send("Welcome to this Api....");
});

//user
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/yarnWeight"));


app.listen(port, (req, res) => {
  console.log(`App running on port ${port}`);
});

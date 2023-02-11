const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
require("dotenv").config({
    "path": "config/config.env"
})
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cookieParser());
app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
);
  

//importing routes
const userRoute = require("./routes/userRoute")


app.use("/api/v1",userRoute);


module.exports = app;
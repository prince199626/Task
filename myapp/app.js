var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
// var appengine = require('appengine');

const db = require("./config/db");
db();
var app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

require("./routes/user.routes")(app);

app.listen(8081);
 
module.exports = app;
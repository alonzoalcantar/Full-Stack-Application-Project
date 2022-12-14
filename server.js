var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var passport = require("passport");
var methodOverride = require("method-override");

require("dotenv").config();
require("./config/database");
require("./config/passport");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var hotelsRouter = require("./routes/hotels");
var reviewsRouter = require("./routes/reviews");
var roomsRouter = require("./routes/rooms");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Method Override Middleware

app.use(methodOverride("_method"));

//Oauth Middleware

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

//Passport Middleware

app.use(passport.initialize());
app.use(passport.session());

//res.local.user Middleware

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

//Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/hotels", hotelsRouter);
app.use("/", reviewsRouter);
app.use("/rooms", roomsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

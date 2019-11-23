const express = require("express");
const bodyParser = require("body-parser");

const paramRoutes = require("./routes/parameters");
const outRoutes = require("./routes/outputs");
const modelRoutes = require("./routes/models");
const acronymRoutes = require("./routes/acronyms");
const themeRoutes = require("./routes/themes");
const setRoutes = require("./routes/sets");
const authRoutes = require("./swim-auth-api/routes/api")(passport);
const yodleeRoutes = require("./yodlee-api/routes/api")(passport);

// 1: NPM dependencies.

var morgan = require("morgan"),
  sequelize = require("sequelize"),
  passport = require("passport"),
  jwt = require("jsonwebtoken"),
  path = require("path");

// 2: App related modules.
// ... Nothing here, yet!
var hookJWTStrategy = require("./swim-auth-api/services/passportStrategy");

const app = express();

//data format parser from the body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 5: Hook up the HTTP logger.
app.use(morgan("dev"));
// Hook the passport JWT strategy.
hookJWTStrategy(passport);

//add CORS and allowed headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

//swim-api routes
app.use("/swim-api/parameters", paramRoutes);
app.use("/swim-api/outputs", outRoutes);
app.use("/swim-api/model-catalog", modelRoutes);
app.use("/swim-api/acronyms", acronymRoutes);
app.use("/swim-api/themes", themeRoutes);
app.use("/swim-api/sets", setRoutes);

// // swim-auth API routes.
app.use("/swim-auth-api", authRoutes);
// logger API routes
app.use("/yodlee-api", yodleeRoutes);

module.exports = app;

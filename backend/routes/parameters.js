const express = require("express");
const MongoSettings = require("../db/mongo");
const MongoClient = require("mongodb").MongoClient;
const ParameterCatalog = require("../models/parameter-catalog");
const dbName = "swim-dev";

const router = express.Router();

router.get("/swim-api/parameters");

//instantiate parameter catalog model
parameter = new ParameterCatalog();
//set database connection settings
dbSettings = new MongoSettings(
  "ilinkadmin",
  "%40test3ilink",
  "129.108.18.45",
  "27017"
);

//get parameters by name
router.get("/name/:name", (req, res, next) => {
  var message = "";
  const client = new MongoClient(dbSettings.GetURL());

  client.connect(function(err) {
    if (err) {
      console.log("Error connecting to MongoDB");
      return res.status(500).json({
        message: "Database connection error"
      });
    } else {
      console.log("Connected to Mongo!");
      const db = client.db(dbName);

      parameter.GetByName(db, req.params.name, function(result) {
        //close connection with database
        client.close();

        if (result.length > 0) message = "Parameters retrieved successfully";
        else message = "No Parameters Found";

        //json response
        return res.status(200).json({
          message: message,
          result: result
        });
      });
    }
  });
});

//get parameters by model
router.get("/model/:id", (req, res, next) => {
  var message= "";
  const client = new MongoClient(dbSettings.GetURL());

  client.connect(function(err) {
    if (err) {
      console.log("Error connecting to MongoDB");
      return res.status(500).json({
        message: "Database connection error"
      });
    } else {
      console.log("Connected to Mongo!");
      const db = client.db(dbName);

      parameter.GetByModel(db, req.params.id, function(result) {
        //close connection with database
        client.close();

        if (result.length > 0) message = "Parameters retrieved successfully";
        else message = "No Parameters Found";

        //json response
        return res.status(200).json({
          message: "Parameters retrieved sucessfully",
          result: result
        });
      });
    }
  });
});

//get all paramaters
router.get("", (req, res, next) => {
  var message = "";
  const client = new MongoClient(dbSettings.GetURL());

  client.connect(function(err) {
    if (err) {
      console.log("Error connecting to MongoDB");
      return res.status(500).json({
        message: "Database connection error"
      });
    } else {
      console.log("Connected to Mongo!");
      const db = client.db(dbName);

      parameter.GetAll(db, function(result) {
        //close connection with database
        client.close();

        if (result.length > 0) message = "Parameters retrieved successfully";
        else message = "No Parameters Found!";

        //json response
        return res.status(200).json({
          message: message,
          result: result
        });
      });
    }
  });
});

module.exports = router;

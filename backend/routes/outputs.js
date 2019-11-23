const express = require("express");
const MongoSettings = require("../db/mongo");
const MongoClient = require("mongodb").MongoClient;
const OutputCatalog = require("../models/output-catalog");
const dbName = "swim-dev";

const router = express.Router();

router.get("/swim-api/outputs");

//instantiate output catalog model
output = new OutputCatalog();
//set database connection settings
dbSettings = new MongoSettings(
  "ilinkadmin",
  "%40test3ilink",
  "129.108.18.45",
  "27017"
);

//get outputs by name
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

      output.GetByName(db, req.params.name, function(result) {
        //close connection with database
        client.close();

        if (result.length > 0) message = "Outputs retrieved successfully";
        else message = "No Outputs Found";

        //json response
        return res.status(200).json({
          message: message,
          result: result
        });
      });
    }
  });
});

//get outputs by model
router.get("/model/:id", (req, res, next) => {
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

      output.GetByModel(db, req.params.id, function(result) {
        //close connection with database
        client.close();
        //console.log(result.length);

        if (result.length > 0) message = "Outputs retrieved successfully";
        else message = "No Outputs Found";

        //json response
        return res.status(200).json({
          message: message,
          result: result
        });
      });
    }
  });
});

//get all outputs
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

      output.GetAll(db, function(result) {
        //close connection with database
        client.close();

        if (result.length > 0) message = "Outputs retrieved successfully";
        else message = "No Outputs Found";

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

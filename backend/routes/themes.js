const express = require("express");
const MongoSettings = require("../db/mongo");
const MongoClient = require("mongodb").MongoClient;
const ThemeCatalog = require("../models/theme-catalog");
const dbName = "swim-dev";

const router = express.Router();

router.get("/swim-api/themes");

// instantiate theme catalog model
theme = new ThemeCatalog();
// db connection settings
dbSettings = new MongoSettings(
  "ilinkadmin",
  "%40test3ilink",
  "129.108.18.45",
  "27017"
);

//get themes by model id
router.get("/model/:modelid", (req, res, next) => {
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

      theme.GetByModelID(db, req.params.modelid, function(result) {
        //close connection with database
        client.close();

        if (result.length > 0) message = "Scenario themes retrieved successfully";
        else message = "No Scenario themes found!";

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

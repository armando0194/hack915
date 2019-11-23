const express = require("express");
const MongoSettings = require("../db/mongo");
const MongoClient = require("mongodb").MongoClient;
const ModelCatalog = require("../models/model-catalog");
const dbName = "swim-dev";

const router = express.Router();

router.get("/swim-api/model-catalog");

//instantiate model metadata model
model = new ModelCatalog();
//set database connection settings
dbSettings = new MongoSettings(
  "ilinkadmin",
  "%40test3ilink",
  "129.108.18.45",
  "27017"
);

//get all models
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

      model.GetAll(db, function(result) {
        //close connection with database
        client.close();

        if (result.length > 0) message = "Models retrieved successfully";
        else message = "No Models Found";

        //json response
        return res.status(200).json({
          message: message,
          result: result
        });
      });
    }
  });
});

//get by model id
router.get("/:id", (req, res, next) => {
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

      model.GetByID(db, req.params.id, function(result) {
        //close connection with database
        client.close();
        //console.log(result.length);

        if (result.length > 0) message = "Models retrieved successfully";
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

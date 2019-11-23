const express = require("express");
const MongoSettings = require("../db/mongo");
const MongoClient = require("mongodb").MongoClient;
const AcronymCatalog = require("../models/acronym-catalog");
const dbName = "swim-dev";

const router = express.Router();

router.get("/swim-api/acronyms");

//instantiate acronym catalog model
acronym = new AcronymCatalog();
//set database connection settings
dbSettings = new MongoSettings(
  "ilinkadmin",
  "%40test3ilink",
  "129.108.18.45",
  "27017"
);

//get outputs by model and language
router.get("/model/:id/lang/:lan", (req, res, next) => {
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

      acronym.GetByModelnLanguage(db, req.params.id, req.params.lan, function(result) {
        //close connection with database
        client.close();
        if (result !== null) message = "Acronym dictionary retrieved successfully";
        else message = "No Acronym Dictionary Found";

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


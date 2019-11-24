// controllers/authController.js

'use strict';

/** API */

const path = require('path');
const fs = require('fs');
var jwt = require('jsonwebtoken');
var privateKey = fs.readFileSync("./devSandbox.key","utf8");  //Location of the file with your private key



var YodleeController = {};

/**
 * Insert a level into the level table
 */
YodleeController.userToken = function(req, res) {
    
    var payload = {};
    var currentTime =  Math.floor(Date.now() / 1000);
    var signOptions = {
        algorithm: "RS512"
    };

    payload.iss = "0098bef0-398e58f5-819e-49e3-880c-e57cda28f826"; 
    payload.iat = currentTime;
    payload.exp = currentTime + 1800;
    payload.sub = req.body.sub;//"sbMemwaunpBypRLOEY2"; //TODO replace this with user string in parametere

    var token = jwt.sign(payload, privateKey, signOptions);
    res.status(200).json({token : token});
   
}

YodleeController.apiToken = function(req, res) {
    var payload = {};
    var currentTime =  Math.floor(Date.now() / 1000);
    var signOptions = {
        algorithm: "RS512"  //Yodlee requires RS512 algorithm when encoding JWT
    };

    payload.iss = "0098bef0-398e58f5-819e-49e3-880c-e57cda28f826"; // The issuer id from the API Dashboard
    payload.iat = currentTime;  //Epoch time when token is issued in seconds
    payload.exp = currentTime + 1800;  //Epoch time when token is set to expire. Must be 1800 seconds 


    var token = jwt.sign(payload, privateKey, signOptions);
    res.status(200).json({token:token});

}





module.exports = YodleeController;


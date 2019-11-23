'use strict';

const path = require('path');
const fs = require('fs');

var jwt = require('jsonwebtoken');
var privateKey = fs.readFileSync("./devSandbox.key","utf8");  //Location of the file with your private key
var payload = {};
var currentTime =  Math.floor(Date.now() / 1000);
var signOptions = {
	algorithm: "RS512"  //Yodlee requires RS512 algorithm when encoding JWT
};

payload.iss = "0098bef0-398e58f5-819e-49e3-880c-e57cda28f826"; // The issuer id from the API Dashboard
payload.iat = currentTime;  //Epoch time when token is issued in seconds
payload.exp = currentTime + 1800;  //Epoch time when token is set to expire. Must be 1800 seconds 


var token = jwt.sign(payload, privateKey, signOptions);
console.log("Printing token: "+ token);
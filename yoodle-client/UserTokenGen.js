'use strict';

const path = require('path');
const fs = require('fs');

var jwt = require('jsonwebtoken');
var privateKey = fs.readFileSync("./devSandbox.key","utf8");
var payload = {};
var currentTime =  Math.floor(Date.now() / 1000);
var signOptions = {
	algorithm: "RS512"
};

payload.iss = "0098bef0-398e58f5-819e-49e3-880c-e57cda28f826"; 
payload.iat = currentTime;
payload.exp = currentTime + 1800;
payload.sub = "sbMemwaunpBypRLOEY2"; //TODO replace this with user string in parametere

var token = jwt.sign(payload, privateKey, signOptions);
console.log("Printing token: "+ token);
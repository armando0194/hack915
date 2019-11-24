// routes/api.js

'use strict';

var router = require('express').Router();
const YodleeController  = require('../controllers/yodleeController');

  

//Routes for logger endpoints
var YodleeRoutes = function(passport) {
    //Routes for tokens
    router.post('/userToken', YodleeController.userToken);
    //guest route
    router.get('/apiToken',YodleeController.apiToken);

    return router;
};

module.exports = YodleeRoutes;
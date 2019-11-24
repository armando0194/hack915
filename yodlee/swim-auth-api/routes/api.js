// routes/api.js

'use strict';

var router = require('express').Router();

var config         = require('../config'),
    AuthController = require('../controllers/authController');

   
    
   
// User routes
var APIRoutes = function(passport) {
    //signup rount
    router.post('/signup', AuthController.signUp);
    //login route
    router.post('/authenticate', AuthController.authenticateUser);
    //guest route
    router.get('/guest',AuthController.guestUser);
    return router;
};

module.exports = APIRoutes;
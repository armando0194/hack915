// controllers/authController.js

'use strict';

var jwt = require('jsonwebtoken');

var config = require('../config'),
    db = require('../services/database'),
    User = require('../models/user');

// The authentication controller.
var AuthController = {};

/**
 * Handle user registration
 * @param req http request
 * @param res http response
 */
AuthController.signUp = function(req, res) {
    //check required fields
    if(!req.body.email || !req.body.password) {
        res.json({ message: 'Please provide email and a password.' });
    } else {
       
        db.sync().then(function() {
             //create a new user with the given data
            var newUser = {
                email: req.body.email,
                password: req.body.password,
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                institution : req.body.institution,
                department : req.body.department
            };
            //insert user into DB. Sign jwt token with email and id
            return User.create(newUser).then(function(user) {
                var token = jwt.sign(
                    { email: newUser.email,
                      id: user.id },
                   
                    config.keys.secret,
                    { expiresIn: '30m' }
                );
                
                res.status(201).json({ idToken: 'JWT ' + token, email:newUser.email, expiresIn: '30000',id:user.id,  success: true, });
             
            });
        }).catch(function(error) {
            res.status(403).json({ message: error });
        });
    }
}

/**
 * Handle user login
 * @param req http request
 * @param res http response
 */
AuthController.authenticateUser = function(req, res) {
    //check required fields
    if(!req.body.email || !req.body.password) {
        res.status(404).json({ message: 'Username and password are needed!' });
    } else {
        //find user with given email in DB
        var email = req.body.email,
            password = req.body.password,
            potentialUser = { where: { email: email } };
        User.findOne(potentialUser).then(function(user) {
          
           
            if(!user) {
                //No user found
                res.status(404).json({ message: 'Authentication failed!' });
            } 
            else{
                    //Password validation
                    var isMatch = User.comparePasswords(password,user);
                    if(isMatch ) {
                        //sign token 
                        var token = jwt.sign(
                            { email: user.email, id:user.id },
                            config.keys.secret,
                            { expiresIn: '30m' }
                        );

                        res.json({ idToken: 'JWT ' + token, email:user.email, expiresIn: '30000',id:user.id,  success: true, });
                    } else {
                        res.status(404).json({ message: 'Login failed!' });
                    }
                }
            }
        ).catch(function(error) {
            res.status(500).json({ message: error });
        });
    }
}

AuthController.guestUser = function(req,res){
    var token = jwt.sign(
        { email : "guest"},
        config.keys.secret,
        { expiresIn: '30m' }
    );
    res.json({idToken: 'JWT ' + token, isGuest:true,success:true})
}



module.exports = AuthController;
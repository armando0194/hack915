// app/models/user.js

// The User model.
'use strict'; 

var Sequelize = require('sequelize');


var config = require('../config'),
    db = require('../services/database');

var crypto = require('crypto');

// 1: The model schema.
var modelDefinition = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    institution: {
        type: Sequelize.STRING,
      
    },
    department: {
        type: Sequelize.STRING,
    
    }
   
};

// 2: The model options.
var modelOptions = {
    freezeTableName: true,
    tablename : 'user',
    hooks: {
        beforeValidate: hashPassword
    }
};

// 3: Define the User model.
var UserModel = db.define('user', modelDefinition, modelOptions);

// Compares two passwords.
UserModel.comparePasswords = function(password,user) {
    var hash = crypto.createHash('sha1').update(password).digest('hex')
    return hash === user.password;
}

// Hashes the password for a user object.
function hashPassword(user) {
    if(user.changed('password')) {
        var hash = crypto.createHash('sha1').update(user.password).digest('hex')
        user.password = hash;
     
    }
}

module.exports = UserModel;
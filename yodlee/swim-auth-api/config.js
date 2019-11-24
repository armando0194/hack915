// app/config.js

// Application configuration.
'use strict';

var config = module.exports;

config.db = {
    user: 'dornelas4', 
    password: 'TA2020',
    name: 'dornelas4_db'
};

config.db.details = {
    host: 'ilinkserver.cs.utep.edu',
       
    dialect: 'mysql'
};

config.keys = {
    secret: '/jVdfUX+u/Kn3qPY4+ahjwQgyV5UhkM5cdh1i2xhozE=' // Not anymore...
};


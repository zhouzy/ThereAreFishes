var users = require("../dao/users")
    ,events = require('events')
    ,util = require('util');

exports.doRegister = function(req, res){
    console.log(req);
    res.render('index',null);
};


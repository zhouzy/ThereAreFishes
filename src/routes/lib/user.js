var dao = require("../../dao")
    ,events = require('events')
    ,common = require("../../common")
    ,util = require('util');

var UserRoute = exports = module.exports = {};

UserRoute.doRegister = function(req, res){
    console.log(req.body);
    dao.userDao.addUser(req.body,function(result){
        common.logUtils.log(result);
        res.end(JSON.stringify(result));
    });
};
UserRoute.doLogin = function (req, res){
    console.log(req.body);
    dao.userDao.login(req.body.email,req.body.password,function(result){
        common.logUtils.log(result);
        res.end(JSON.stringify(result));
    });
};


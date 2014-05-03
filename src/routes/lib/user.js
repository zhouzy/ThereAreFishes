var dao = require("../../dao")
    ,events = require('events')
    ,common = require("../../common")
    ,util = require('util');

var UserRoute = exports = module.exports = {};

UserRoute.doRegister = function(req, res){
    console.log("用户注册:" + req.body);
    dao.userDao.addUser(req.body,function(result){
        common.logUtils.log(result);
        res.end(JSON.stringify(result));
    });
};
UserRoute.doLogin = function (req, res){
    console.log("用户登录:[" + "email:" + req.body.email + "]");
    dao.userDao.login(req.body.email,req.body.password,function(result){
        common.logUtils.log(JSON.stringify(result));
        res.end(JSON.stringify(result));
    });
};


var userDao = require("../../dao").userDao,
    common  = require("../../common"),
    utils   = common.utils;
var UserRoute = exports = module.exports = {};

UserRoute.doRegister = function(req, res){
    var user = req.body;
    console.log("新用户注册:" + JSON.stringify(user));

    userDao.checkUsername(user.username).then(function(u){
        if(u){
            throw new ERROR("用户名存在");
        }
        return userDao.checkEmail(user.email);
    }).then(function(u){
        if(u){
            throw new ERROR("邮箱已注册");
        }
        return userDao.addUser(user);
    }).then(function(user){
        res.end();
    }).fail(utils.getFailFn(true,res));
};

UserRoute.doLogin = function (req, res){
    console.log("用户登录:[" + "email:" + req.body.email + "]");

    userDao.login(req.body.email,req.body.password).then(function(user){
        if(user){
            res.end(JSON.stringify(utils.getMessageJSON(user)));
        }
        else{
            res.end(JSON.stringify("error","error",utils.getMessageJSON(user)));
        }
    }).fail(utils.getFailFn(true,res));

};

var _setUserSession = function(user,req){
    req.Session.user = user;
}

var _getUserSession = function(){
    return req.Session;
}

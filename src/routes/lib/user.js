var userDao = require("../../dao").userDao,
    common  = require("../../common"),
    utils   = common.utils;
var UserRoute = exports = module.exports = {};

UserRoute.doRegister = function(req, res){
    var user = req.body;
    console.log("新用户注册:" + JSON.stringify(user));

    userDao.checkUsername(user.username).then(function(user){
        if(user){
            throw new ERROR("用户名存在");
        }
        return userDao.checkEmail(user.email);
    }).then(function(user){
        if(user){
            throw new ERROR("邮箱已注册");
        }
        return userDao.addUser(user);
    }).then(function(user){
        res.end();
    }).fail(utils.getFailFn(true,res));
};

UserRoute.doLogin = function (req, res){
    console.log("用户登录:[" + "email:" + req.body.email + "]");
    dao.userDao.login(req.body.email,req.body.password,function(result){
        common.logUtils.log(JSON.stringify(result));

        res.end(JSON.stringify(result));
    });

};

var _setUserSession = function(user,req){

}

var _getUserSession = function(){

}

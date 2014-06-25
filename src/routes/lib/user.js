var userDao = require("../../dao").userDao,
    common  = require("../../common");

var UserRoute = exports = module.exports = {};

UserRoute.doRegister = function(req, res){
    var user = req.body;
    console.log("新用户注册:" + JSON.stringify(user));

    //TODO:check username
    userDao.checkUsername(user.username).then(function(){}).fail(function(){});
    //TODO:check email
    userDao.checkEmail(user.email).then(function(){}).fail(function(){});
    //TODO:add user
    userDao.addUser(user).then(function(){}).fail(function(){});
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

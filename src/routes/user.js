var dao = require("../dao")
    ,events = require('events')
    ,util = require('util');
var userRoute = exports = module.exports = {};
userRoute.doRegister = function(req, res){
    console.log(req.body);
    dao.userDao.addUser(req.body,function(){
        //res.render('index',model);
    });
};


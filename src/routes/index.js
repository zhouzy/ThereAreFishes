var users = require("../dao/users")
    ,fishing = require("../dao/fishing")
    ,logUtils = require('../utils/LogUtils')
    ,events = require('events')
    ,util = require('util');

exports.index = function(req, res){
    var userCount = 0;
    var model = {
        title:"这儿有鱼"
    };

    function userListCallBack(userList){
        model.itemList = userList;
        userCount = userList.length;
        for(var i= 0,j=userList.length;i<j;i++){
            getFishingByUserId(userList[i]);
        }
    }
    function getFishingByUserId(user){
        fishing.getFishingByUserId(user.userId,function(fishing){
            userCount--;
            user.fishing = fishing;
            if(userCount === 0){
                res.render('index',model);
            }
        });
    }
    users.query("userList",userListCallBack);
};


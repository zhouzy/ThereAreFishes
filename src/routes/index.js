var users = require("../dao/users")
    ,fishing = require("../dao/fishing")
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
            getFishingByUserId(i);
        }
    }
    function getFishingByUserId(i){
        fishing.getFishingByUserId(model.itemList[i].userId,function(fishings){
            userCount--;
            model.itemList[i].fishings = fishings;
            if(userCount === 0){
                console.log(JSON.stringify(model));
                res.render('index',model);
            }
        });
    }
    users.query(userListCallBack);
};

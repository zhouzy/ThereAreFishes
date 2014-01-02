var users = require("../dao/users")
    ,fishing = require("../dao/fishing")
    ,dbUtils = require('../utils/dbUtils')
    ,events = require('events')
    ,util = require('util')
    ,logUtils = require('LogUtils');

exports.index = function(req, res){

    var model = {
        title:"这儿有鱼"
    }
        ,emitter = new events.EventEmitter();

    function userListCallBack(userList){
        for(var i= 0,j=userList.length;i<j;i++){
            emitter.on("FISHING_QUERY_SUCCESS",function(data){
                userList[i].fishing = data;
                if(i === userList.length-1){
                    model.itemList = userList;
                    res.render('index',model);
                }
            });
        }
    }
    emitter.on("USER_QUERY_SUCCESS",userListCallBack);
};


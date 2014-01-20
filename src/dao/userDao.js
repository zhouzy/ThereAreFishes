/**
 * Created with JetBrains WebStorm.
 * Author: ZhouZhongYu
 * Date: 13-12-27
 * Time: 下午5:23
 * To change this template use File | Settings | File Templates.
 */
var events = require('events')
    ,util = require('util')
    ,dbUtils = require("../utils/dbUtils")
    ,mongoose = require("mongoose")
    ,mySchema = require('../Schema/mySchema');

var userDao = exports = module.exports = {};
var User = dbUtils.db.model("User",mySchema.User);
userDao.query = function(callback){
    User.find().limit(10).exec(function(err,data){
        callback(data);
    });
};
userDao.addUser = function(user,callback){
    var newUser = new User({email:user.email,password:user.password,username:user.username});
    newUser.save(function(err){
        if(err){
            console.log("添加用户失败");
        }else{
            console.log("添加用户成功");
            callback();
        }
    });
};

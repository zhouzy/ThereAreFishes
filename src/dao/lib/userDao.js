/**
 * Created with JetBrains WebStorm.
 * Author: ZhouZhongYu
 * Date: 13-12-27
 * Time: 下午5:23
 * To change this template use File | Settings | File Templates.
 */
var events = require('events')
    ,util = require('util')
    ,common = require('../../common')
    ,dbUtils = common.dbUtils
    ,mongoose = require("mongoose")
    ,events = require("events")
    ,mySchema = require('../../Schema/mySchema');

var userDao = exports = module.exports = {};
var User = dbUtils.getDB().model("User",mySchema.User);

userDao.query = function(callback){
    User.find().limit(10).exec(function(err,data){
        callback(data);
    });
};

userDao.addUser = function(user,callback){
    var emitter = new events.EventEmitter();
    emitter.on("DB_ERROR",callback);
    emitter.on("EMAIL_EXIST",callback);
    emitter.on("USERNAME_EXIST",callback);
    emitter.on("EMAIL_NOT_EXIST",function(){
        _checkUsername(user.username,emitter);
    });
    emitter.on("USERNAME_NOT_EXIST",function(){
        _addUser2DB(user,emitter);
    });
    _checkEmail(user.email,emitter);
};

function _checkUsername(username,emitter){
    User.findOne({username:username},function(err,doc){
        if(err){
            emitter.emit("DB_ERROR");
        }
        else if(doc){
            emitter.emit("USERNAME_EXIST",common.msgUtils.warp(false,common.msgUtils.MsgJSON.ERR_USER_EXIST));
        }else{
            emitter.emit("USERNAME_NOT_EXIST");
        }
    });
}
function _checkEmail(email,emitter){
    User.findOne({email:email},function(err,doc){
        if(err){
            emitter.emit("DB_ERROR");
        }
        else if(doc){
            emitter.emit("EMAIL_EXIST",common.msgUtils.warp(false,common.msgUtils.MsgJSON.ERR_EMAIL_EXIST));
        }
        else{
            emitter.emit("EMAIL_NOT_EXIST");
        }
    });
}
function _addUser2DB(user,emitter){
    var newUser = new User({email:user.email,password:user.password,username:user.username});
    newUser.save(function(err){
        if(err){
            common.logUtils.log(common.msgUtils.MsgJSON.ERR_DB_ERROR);
            emitter.emit("DB_ERROR");
        }else{
            emitter.emit(common.msgUtils.warp());
        }
    });
}

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
    ,mySchema = require('../../Schema/mySchema');

var userDao = exports = module.exports = {};
var User = dbUtils.getDB().model("User",mySchema.User);

/**
 * 查询用户列表
 * @param callback
 */
userDao.query = function(callback){
    User.find().limit(10).exec(function(err,data){
        callback(data);
    });
};

/**
 * 注册新用户
 * @param user
 * @param callback
 */
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
    emitter.on("ADD_USER_SUCCESS",callback);
    _checkEmail(user.email,emitter);
};

/**
 * 用户登陆
 * @param email
 * @param password
 */
userDao.login = function(email, password, callback){
    User.find({email:email,password:password}).exec(function(err,data){
        console.log(data);
        callback(common.msgUtils.warp(true,null,data));
    });
};

/**
 * 检查用户名是否已经存在
 * @param username
 * @param emitter
 * @private
 */
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
/**
 * 检查邮箱是否已经注册
 * @param email
 * @param emitter
 * @private
 */
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
/**
 * 向数据库增加用户
 * @param user
 * @param emitter
 * @private
 */
function _addUser2DB(user,emitter){
    var newUser = new User({email:user.email,password:user.password,username:user.username});
    newUser.save(function(err){
        if(err){
            common.logUtils.log(common.msgUtils.MsgJSON.ERR_DB_ERROR);
            emitter.emit("DB_ERROR");
        }else{
            emitter.emit("ADD_USER_SUCCESS",common.msgUtils.warp());
        }
    });
}

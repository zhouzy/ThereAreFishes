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

userDao.query = function(callback){
    User.find().limit(10).exec(function(err,data){
        callback(data);
    });
};
userDao.addUser = function(user,callback){
    User.findOne({email:user.email},function(err,doc){
        if(err){
            common.logUtils.log(common.msgUtils.MsgJSON.ERR_DB_ERROR);
            callback(common.msgUtils.warp(false,common.msgUtils.MsgJSON.ERR_DB_ERROR));
        }else if(doc){
            //邮箱已注册
            common.logUtils.log(common.msgUtils.MsgJSON.ERR_EMAIL_EXIST);
            callback(common.msgUtils.warp(false,common.msgUtils.MsgJSON.ERR_EMAIL_EXIST));
        }else{
            User.findOne({username:user.username},function(err,doc){
                if(err){
                    common.logUtils.log(common.msgUtils.MsgJSON.ERR_DB_ERROR);
                    callback(common.msgUtils.warp(false,common.msgUtils.MsgJSON.ERR_DB_ERROR));
                }else if(doc){
                    //用户已存在
                    common.logUtils.log(common.msgUtils.MsgJSON.ERR_USER_EXIST);
                    callback(common.msgUtils.warp(false,common.msgUtils.MsgJSON.ERR_USER_EXIST));
                }
                else{
                    var newUser = new User({email:user.email,password:user.password,username:user.username});
                    newUser.save(function(err){
                        if(err){
                            common.logUtils.log(common.msgUtils.MsgJSON.ERR_DB_ERROR);
                            callback(common.msgUtils.warp(false,common.msgUtils.MsgJSON.ERR_DB_ERROR));
                        }else{
                            callback(common.msgUtils.warp());
                        }
                    });
                }
            });
        }
    });
};

/**
 * Created with JetBrains WebStorm.
 * Author: ZhouZhongYu
 * Date: 13-12-27
 * Time: 下午5:23
 * To change this template use File | Settings | File Templates.
 */
var dbUtils = require('../utils/dbUtils')
    ,events = require('events')
    ,util = require('util')
    ,logUtils = require('LogUtils')
    ,user = exports.modal = new User();
function User(){
    events.EventEmitter.call();
}
utils.inherits(User,events.EventEmitter);

User.prototype.getUserList = function(docId){
    dbUtils.query(docId);
}

user.on("DB_QUERY_FAILURE",function(data){
    console.log(logUtils("USER_QUERY_FAILURE"));
    this.emit("USER_QUERY_FAILURE",data);
});

user.on("DB_QUERY_SUCCESS",function(data){
    console.log(logUtils("USER_QUERY_SUCCESS"));
    this.emit("USER_QUERY_SUCCESS",data);
});
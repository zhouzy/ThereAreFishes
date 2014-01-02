/**
 * Created with JetBrains WebStorm.
 * Author: ZhouZhongYu
 * Date: 13-12-27
 * Time: 下午5:23
 * 查询user对应的fishing信息
 */
var dbUtils = require('../utils/dbUtils')
    ,events = require('events')
    ,util = require('util')
    ,logUtils = require('LogUtils')
    ,fishing = exports.modal = new Fishing();
function Fishing(){
    events.EventEmitter.call();
}
utils.inherits(Fishing,events.EventEmitter);

Fishing.prototype.getFishingByUserId = function(userId){
    dbUtils.query(userId);
}

fishing.on("DB_QUERY_FAILURE",function(data){
    console.log(logUtils("FISHING_QUERY_FAILURE"));
    this.emit("FISHING_QUERY_FAILURE",data);
});

fishing.on("DB_QUERY_SUCCESS",function(data){
    console.log(logUtils("FISHING_QUERY_SUCCESS"));
    this.emit("FISHING_QUERY_SUCCESS",data);
});
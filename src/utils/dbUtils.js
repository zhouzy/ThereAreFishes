/**
 * Created with JetBrains WebStorm.
 * Author: ZhouZhongYu
 * Date: 13-12-27
 * Time: 上午11:39
 * 消息驱动数据库查询工具类
 */
var events = require('events')
    ,util = require('util')
    ,logUtils = require('LogUtils')
    ,cradle = require('cradle')
    ,c = new(cradle.Connection)("127.0.0.1","5984",{cache: false, raw: false})
    ,db = c.database("there_are_fishes");

function DB(){
    events.EventEmitter.call();
}
utils.inherits(DB,events.EventEmitter);

DB.prototype.query = function(docId){
    db.get(docId,function(err,doc){
        if(err){
            console.log(logUtils("DB_QUERY_FAILURE",null,err));
            this.emit("DB_QUERY_FAILURE",null);
        }else{
            console.log(logUtils("DB_QUERY_SUCCESS"));
            this.emit("DB_QUERY_SUCCESS", doc);
        }
    });
}

var db = new DB();

exports.query = db.query();

/**
 * Created with JetBrains WebStorm.
 * Author: ZhouZhongYu
 * Date: 13-12-27
 * Time: 上午11:39
 * 消息驱动数据库查询工具类
 */
var events = require('events')
    ,util = require('util')
    ,logUtils = require('./LogUtils')
    ,cradle = require('cradle')
    ,db = new(cradle.Connection)("127.0.0.1","5984",{cache: false, raw: false}).database("there_are_fishes");

exports.query = function(docId,callback){
    db.get(docId,function(err,doc){
        if(err){
            console.log(logUtils.format("DB_QUERY_FAILURE",null,"{docId:" + docId + "}"));
            callback(null);
        }else{
            console.log(logUtils.format("DB_QUERY_SUCCESS",null,"{docId:" + docId + "}"));
            callback(doc);
        }
    });
};

/**
 * Created with JetBrains WebStorm.
 * Author: ZhouZhongYu
 * Date: 13-12-27
 * Time: 下午5:23
 * 查询user对应的fishing信息
 */
var dbUtils = require('../utils/dbUtils')
    ,events = require('events')
    ,util = require('util');

exports.getFishingByUserId = function(userId,callback){
    dbUtils.query(userId,function(data){
        callback(data.fishing);
    });
}

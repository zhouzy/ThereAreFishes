/**
 * Created with JetBrains WebStorm.
 * Author: ZhouZhongYu
 * Date: 13-12-27
 * Time: 下午5:23
 * To change this template use File | Settings | File Templates.
 */
var dbUtils = require('../utils/dbUtils')
    ,events = require('events')
    ,util = require('util');

exports.query = function(docId,callback){
    dbUtils.query(docId,function(data){
        callback(data.userList);
    });
};

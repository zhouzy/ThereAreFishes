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

exports.query = function(callback){
    var User = dbUtils.db.model("User",mySchema.User);
    User.find().limit(10).exec(function(err,data){
        callback(data);
    });
}

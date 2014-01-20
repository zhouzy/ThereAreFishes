/**
 * Created with JetBrains WebStorm.
 * Author: ZhouZhongYu
 * Date: 13-12-27
 * Time: 下午5:23
 * 查询user对应的fishing信息
 */

var events = require('events')
    ,util = require('util')
    ,dbUtils = require("../utils/dbUtils")
    ,mongoose = require("mongoose")
    ,mySchema = require('../Schema/mySchema');

var fishing = exports = module.exports = {};
fishing.getFishingByUserId = function(userId,callback){
    var Fishing = dbUtils.db.model("Fishing",mySchema.Fishing);
    Fishing.find({userId:userId}).exec(function(err,data){
        console.log(data);
        callback(data);
    });
};


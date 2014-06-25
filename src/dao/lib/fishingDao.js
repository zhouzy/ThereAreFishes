/**
 * Created with JetBrains WebStorm.
 * Author: ZhouZhongYu
 * Date: 13-12-27
 * Time: 下午5:23
 * 查询user对应的fishing信息
 */

var events = require('events')
    ,common = require('../../common')
    ,mySchema = require('../../Schema/mySchema');

var Fishing = exports = module.exports = {};

Fishing.getFishingByUserId = function(userId,callback){
    var Fishing = common.dbUtils.getDB().model("Fishing",mySchema.Fishing);
    Fishing.find({userId:userId}).exec(function(err,data){
        callback(data);
    });
};


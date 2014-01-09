/**
 * Created with JetBrains WebStorm.
 * Author: ZhouZhongYu
 * Date: 13-12-27
 * Time: 下午5:23
 * 查询user对应的fishing信息
 */

require("../utils/dbUtils");
var mongoose = require('mongoose')
    ,events = require('events')
    ,util = require('util')
    ,MySchema = require('../Schema/FishingSchema');

exports.getFishingByUserId = function(callback){
    var fishing = mongoose.model("userList",MySchema.fishingSchema);
    fishing.find({}).exec(function(){
        callback(data);
    });
}

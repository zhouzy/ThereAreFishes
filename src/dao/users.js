/**
 * Created with JetBrains WebStorm.
 * Author: ZhouZhongYu
 * Date: 13-12-27
 * Time: 下午5:23
 * To change this template use File | Settings | File Templates.
 */

require("../utils/dbUtils");

var mongoose = require('mongoose')
    ,events = require('events')
    ,util = require('util')
    ,MySchema = require('../Schema/UserSchema');

exports.getFishingByUserId = function(callback){
    var userList = mongoose.model("userList",mongoose.Schema({userList:[MySchema.UserSchema]}));
    userList.find({}).exec(function(){
        callback(data);
    });
}

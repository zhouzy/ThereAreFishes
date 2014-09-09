/**
 * Created with WebStorm.
 * Author: ZhouZhongYu
 * Date: 14-1-8
 * Time: 下午2:16
 * 定义 Schema
 */
var mongoose = require("mongoose");
exports.User = new mongoose.Schema({
    userId:String,
    email:String,
    password:String,
    phoneNo:String,
    username:String,
    avertarUrl:String
});
exports.Fishing = new mongoose.Schema({
    userId:String,
    activityId:String,
    photoUrl: String,
    abstract: String,
    fishTools:{fishhook: String, fishingRod:String, bait:String}
});
exports.Activity = new mongoose.Schema({
    activityId:String,
    status:String,
    userId:String,
    name:String,
    time:{type:Date,get:function(val){return (val.getMonth() + 1) + "/" + val.getDate() + "/" + val.getFullYear();}},
    address:String,
    telNo:String,
    remark:String
});


/**
 * Created with WebStorm.
 * Author: ZhouZhongYu
 * Date: 14-1-8
 * Time: 下午2:16
 * 定义User Schema
 */
var mongoose = require("mongoose");
exports.User = new mongoose.Schema({
    userId:String,
    email:String,
    password:String,
    phoneNo:String,
    username:String,
    avertarUrl:String,
    fishings:[]
});
exports.Fishing = new mongoose.Schema({
    userId:String,
    photoUrl: String,
    abstract: String,
    fishTools:{fishhook: String, fishingRod:String, bait:String}
});
exports.Activity = new mongoose.Schema({
    userId:String,
    name:String,
    time:Date,
    address:String,
    telNo:String,
    remark:String
});


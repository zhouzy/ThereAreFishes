/**
 * Created with WebStorm.
 * Author: ZhouZhongYu
 * Date: 14-1-8
 * Time: 下午2:27
 * 定义 Fishing Schema
 */
var mongoose = require("mongoose")
    ,FishingToolsSchema = require("./FishingToolsSchema");
exports.UserSchema = new mongoose.Schema({
    userId:String,
    photoUrl: String,
    abstract: String,
    fishing:[FishingToolsSchema.FishingToolsSchema]
});
/**
 * Created with WebStorm.
 * Author: ZhouZhongYu
 * Date: 14-1-8
 * Time: 下午2:54
 * 定义 FishingTool Schema
 */
var mongoose = require("mongoose");
exports.FishingToolsSchema = new mongoose.Schema({
    fishhook:String,
    fishingRod:String,
    bait:String
});
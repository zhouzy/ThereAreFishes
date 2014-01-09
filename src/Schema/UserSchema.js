/**
 * Created with WebStorm.
 * Author: ZhouZhongYu
 * Date: 14-1-8
 * Time: 下午2:16
 * 定义User Schema
 */
var mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    userId: String,
    email: String,
    phoneNo: String,
    username: String,
    avertarUrl:String
});


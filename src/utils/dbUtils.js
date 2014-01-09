/**
 * Created with JetBrains WebStorm.
 * Author: ZhouZhongYu
 * Date: 13-12-27
 * Time: 上午11:39
 * 消息驱动数据库查询工具类
 */
var mongoose= require('mongoose')
    ,db = mongoose.createConnection("localhost","ThereAreFishes");

db.on('error',console.error.bind(console,'连接错误:'));

exports.db = db;

/**
 * Created with WebStorm.
 * Author: ZhouZhongYu
 * Date: 14-5-5
 * Time: 下午5:00
 */
var dao = require("../../dao")
    ,events = require('events')
    ,common = require("../../common")
    ,util = require('util');

var Activity = exports = module.exports = {};

Activity.main = function(req, res){
    console.log("活动->创建活动页面");
    res.render("activity/main.jade");
};
Activity.add = function(req, res){
};

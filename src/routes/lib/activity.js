/**
 * Created with WebStorm.
 * Author: ZhouZhongYu
 * Date: 14-5-5
 * Time: 下午5:00
 */
var dao, events, common, util;
dao = require("../../dao");
events = require('events');
common = require("../../common");
util = require('util');

var Activity = exports = module.exports = {};
var model = {"title":"活动页面"}

Activity.main = function(req, res){
    console.log("活动->创建活动页面");
    res.render("activity/main.jade");
};
Activity.add = function(req, res){
    console.log("活动->提交创建活动:" + JSON.stringify(req.body));
    model.list = _getActivityList();
    res.render("activity/list.jade",model);
};
Activity.list = function(){
    console.log("活动->活动列表页面" + JSON.stringify(req.body));

    //TODO:新创建活动写入数据库

    model.list = _getActivityList();
    res.render("activity/list.jade",model);
}

var _getActivityList = function(){

}

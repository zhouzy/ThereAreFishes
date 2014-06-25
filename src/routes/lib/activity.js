/**
 * Created with WebStorm.
 * Author: ZhouZhongYu
 * Date: 14-5-5
 * Time: 下午5:00
 */
var activityDao = require("../../dao").activityDao,
    events      = require('events')
    msgUtils    = require('../../common').msgUtils;

var Activity = exports = module.exports = {};
var model = {"title":"活动页面"}

Activity.main = function(req, res){
    console.log("活动->创建活动页面");
    res.render("activity/main.jade");
};

Activity.add = function(req, res){
    console.log("活动->提交创建活动:" + JSON.stringify(req.body));
    var activity = req.body;
    var userId = "1000000000";
    activityDao.addActivity(activity,userId).then(function(){
        res.end(JSON.stringify(msgUtils.warp()));
    }).fail(function(reson){
        console.log(reson);
        res.end(JSON.stringify(reson));
    });
};

Activity.list = function(req, res){
    console.log("活动->活动列表页面" + JSON.stringify(req.body));
    var userId = "1000000000";
    activityDao.getActivityList(userId).then(function(list){
        model.list = list;
        res.render("activity/list.jade",model);
    }).fail(function(){
        res.render("activity/main.jade",model);
    });
}

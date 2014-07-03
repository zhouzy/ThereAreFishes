/**
 * Created with WebStorm.
 * Author: ZhouZhongYu
 * Date: 14-5-5
 * Time: 下午5:00
 */
var activityDao = require("../../dao").activityDao,
    events      = require('events'),
    common      = require("../../common"),
    utils       = common.utils,
    page        = common.page;

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
        res.end(JSON.stringify(utils.getMessageJSON()));
    }).fail(utils.getFailFn(true,res));
};

Activity.list = function(req, res){
    console.log("活动->活动列表页面" + JSON.stringify(req.body));
    var userId = "1000000000";
    activityDao.getActivityList(userId,page.getPageInfo(1,20)).then(function(list){
        model.list = list;
        res.render("activity/list.jade",model);
    }).fail(function(){
        res.render("activity/main.jade",model);
    });
}

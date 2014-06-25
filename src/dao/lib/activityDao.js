/**
 * Created with IntelliJ IDEA.
 * User: zhouzhongyu
 * Date: 14/06/24
 * Time: 15:55
 * Todo: 活动DAO层
 */
var common   = require("../../common"),
    Q        = require("q"),
    mySchema = require('../../Schema/mySchema'),
    model    = common.dbUtils.getDB().model("activities",mySchema.Activity);

var ActivityDao = exports = module.exports;

ActivityDao.addActivity = function(activity,userId){
    var ActivityCreate = Q.nfbind(model.create.bind(model));
    activity.userId = userId;
    return ActivityCreate(activity);
}

ActivityDao.getActivityList = function(userId){
    var ActivityFind = Q.nfbind(model.find.bind(model));
    return ActivityFind({userId:userId},{skip:0,limit:10});
}


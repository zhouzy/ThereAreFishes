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

var ActivityDao  = exports = module.exports,
    QFind        = Q.nfbind(model.find.bind(model)),
    QCreate      = Q.nfbind(model.create.bind(model));

/**
 * 添加活动
 * @param activity 活动ID
 * @param userId   用户ID
 * @returns Promise
 */
ActivityDao.addActivity = function(activity,userId){
    activity.userId = userId;
    return QCreate(activity);
}

/**
 * 查询用户所创建的活动
 * @param userId   用户ID
 * @returns Promise
 */
ActivityDao.getActivityList = function(userId){
    return QFind({userId:userId},{skip:0,limit:10});
}

/**
 * 查询所有用户创建的活动
 * @returns {*}
 */
ActivityDao.getAllActivitys = function(pageInfo){
    return QFind({skip:0,limit:10});
}




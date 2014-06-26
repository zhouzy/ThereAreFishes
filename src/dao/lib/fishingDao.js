/**
 * Created with JetBrains WebStorm.
 * Author: ZhouZhongYu
 * Date: 13-12-27
 * Time: 下午5:23
 * 查询user对应的fishing信息
 */

var Q        = require("q"),
    events   = require('events'),
    common   = require('../../common'),
    mySchema = require('../../Schema/mySchema');

var Fishing  = exports = module.exports = {},
    model    = common.dbUtils.getDB().model("fishings",mySchema.Fishing),
    QFind    = Q.nfbind(model.find.bind(model));

/**
 * 返回用户渔获列表
 * @param userId
 * @returns {*}
 */
Fishing.getFishingByUserId = function(userId){
    return QFind({userId:userId});
};

Fishing.getFishings = function(pageInfo){
    return QFind({},{},{skip:pageInfo.getSkip(),limit:pageInfo.getLimit()});
}


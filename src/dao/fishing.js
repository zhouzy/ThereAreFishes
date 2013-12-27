/**
 * Created with JetBrains WebStorm.
 * Author: ZhouZhongYu
 * Date: 13-12-27
 * Time: 下午5:23
 * To change this template use File | Settings | File Templates.
 */
var dbUtils = require('../utils/dbUtils');

exports.getFishingByUserId = function(userId,callback){
    dbUtils.query(userId,function(fishing){
        if(fishing){
            callback(fishing);
        }else{
            throw new Error("-userId:" + userId + "对应fishing 为空");
        }
    });
}
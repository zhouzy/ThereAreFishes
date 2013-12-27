/**
 * Created with JetBrains WebStorm.
 * Author: ZhouZhongYu
 * Date: 13-12-27
 * Time: 下午4:47
 * To change this template use File | Settings | File Templates.
 */
var dbUtils = require('../utils/dbUtils');

exports.getUserList = function(callback){
    dbUtils.query("userList",function(userList){
        if(userList){
            callback(userList);
        }else{
            throw new Error("-userList 为空");
        }
    });
}

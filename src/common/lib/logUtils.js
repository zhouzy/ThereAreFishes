/**
 * Created with JetBrains WebStorm.
 * Author: ZhouZhongYu
 * Date: 14-1-2
 * Time: 下午4:48
 * 日志工具类
 */
exports.log = function(msgJSON){
    msgJSON = msgJSON || {};
    var re = [];
    msgJSON.code && re.push("ERROR_CODE:" + code);
    msgJSON.des && re.push("ERROR_DES:" + des);
    return "{" + re.join(",") + "}";
}


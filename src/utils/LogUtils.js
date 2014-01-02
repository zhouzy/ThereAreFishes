/**
 * Created with JetBrains WebStorm.
 * Author: ZhouZhongYu
 * Date: 14-1-2
 * Time: 下午4:48
 * 日志工具类
 */
exports.LogUtils = function(msg,code,des){
    var re = [];
    msg && re.push("MSG:" + msg);
    code && re.push("ERROR_CODE:" + code);
    des && re.push("ERROR_DES:" + des);
    return "{" + re.join(",") + "}";
}


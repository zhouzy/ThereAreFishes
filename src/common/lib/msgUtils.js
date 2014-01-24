/**
 * Created with WebStorm.
 * Author: ZhouZhongYu
 * Date: 14-1-21
 * Time: 上午10:42
 * 消息JSON对象
 */

var MsgUtils = module.exports = exports = {};

MsgUtils.MsgJSON = {
    ERR_DB_ERROR:{
        errCode:-0001,
        errMsgCn:"数据库错误",
        errMsgEn:"dataBase error"
    },
    ERR_USER_EXIST:{
        errCode:-1001,
        errMsgCn:"用户已存在",
        errMsgEn:"user has existed"
    },
    ERR_EMAIL_EXIST:{
        errCode:-1002,
        errMsgCn:"邮箱已注册",
        errMsgEn:"email has registered"
    }
};

MsgUtils.warp = function(isSuccess,msgJSON,data){
    if(arguments.length === 0){
        return {isSuccess:true}
    }
    var _msg = {
        isSuccess:isSuccess,
        msg:msgJSON,
        data:data
    };
    return _msg;
};


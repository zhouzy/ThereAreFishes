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
    }
};

MsgUtils.warp = function(isFailure,msgJSON){
    var _msg = {
        isSuccess:true,
        msg:null
    };
    if(isFailure){
        return _msg;
    }else{
        return {
            isSuccess:isFailure,
            msg:msgJSON
        };
    }
};


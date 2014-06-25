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
        code:"error",
        message:"dataBase error",
        data:null
    },
    ERR_USER_EXIST:{
        code:"error",
        message:"user has existed",
        data:null
    },
    ERR_EMAIL_EXIST:{
        code:"error",
        message:"email has registered",
        data:null
    }
};

MsgUtils.warp = function(code,message,data){
    var msg = {code:"success",message:"success",data:null};
    if(arguments.length != 0){
        msg = {
            isSuccess:isSuccess,
            msg:msgJSON,
            data:data
        };
    }
    return msg;
};


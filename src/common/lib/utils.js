/**
 * Created with WebStorm.
 * Author: ZhouZhongYu
 * Date: 14-1-21
 * Time: 上午10:42
 * 消息JSON对象
 */

var Utils = module.exports = exports = {};

Utils.getMessageJSON = function(data,code,message){
    var msg = {code:"success",message:"success",data:null};
    code = code || "success";
    message = message || "success";
    if(arguments.length != 0){
        msg = {
            code:code,
            message:message,
            data:data
        };
    }
    return msg;
};

/**
 * 该函数返回，专门处理Promise出现异常时的回调函数
 * @param isAjax    ：是否是ajax请求，确定时返回给前台一个JSON字符串，还是刷新页面
 * @param res
 * @param jadeFile  ：当返回页面时，jade页面路径
 * @param model     ：当返回页面时，页面数据
 * @returns {Function}
 */
Utils.getFailFn = function(isAjax,res,jadeFile,model){
    return function(reson){
        console.error(reson);
        if(isAjax){
            res.end(JSON.stringify(Utils.getMessageJSON("error",reson,null)));
        }
        else{
            res.render(jadeFile,model);
        }
    }
}

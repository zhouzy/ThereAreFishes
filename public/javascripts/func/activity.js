/**
 * 活动创建
 * Author: ZhouZhongYu
 * Date: 14-5-7
 * Time: 下午4:46
 */

$(function(){
    form.init();
});

var form = (function(){
    var o = new Component();
    o.init = function(){
        $("#submit").on("click",function(){
            var formVal = getValueFromInputArr($("#act-form"));
            submitFrom("/activity/add",formVal,onSubmitSuccess,onSubmitFailure);
        });

        $("#goback").on("click",function(){
            window.history.back();
        });
    };

    //TODO:提交成功，回调处理
    function onSubmitFailure(msg){
    }

    //TODO:提交失败，回调处理
    function onSubmitSuccess(msg){
    }
    return o;
}());


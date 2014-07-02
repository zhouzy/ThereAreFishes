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
            if(ifFillInInput()){
                var formVal = getValueFromInputArr($("#act-form"));
                submitFrom("/activity/add",formVal,_onSubmitSuccess,_onSubmitFailure);
            }
        });

        $("#goback").on("click",function(){
            window.history.back();
        });

        requiredInput();
    };

    //TODO:提交成功，回调处理
    function _onSubmitSuccess(msg){

    }

    //TODO:提交失败，回调处理
    function _onSubmitFailure(msg){
        window.location.href = "/activity/list";
    }
    return o;
}());


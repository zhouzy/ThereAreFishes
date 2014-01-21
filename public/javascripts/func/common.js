/**
 * Created with WebStorm.
 * Author: ZhouZhongYu
 * Date: 14-1-14
 * Time: 上午11:32
 * 顶部栏 选项 搜索 用户功能
 */
function log(msg){
    console && console.log(msg);
}
function search(keyword,callback){

}
function goLogin(){
}
function doLogin(email,password){

}
function newUser(){

}

function dropDownList(){

}
function getValueFromInputArr($content){
    var _data = {};
    $("input[name]",$content).each(function(){
        var $this = $(this)
            ,val = $this.val()
            ,name = $this.attr("name");
        val && name && (_data[name] = val);
    });
    return _data;
}
function validateForm(data,loginOrRegister){
    data = data || {};
    if("register" === loginOrRegister){
        if(!data.username){
            //TODO:用户名不能为空
            return false;
        }
        if(!data.email){
            //TODO:注册邮箱不能为空
            return false;
        }
        if(!data.password){
            //TODO:密码不能为空
            return false;
        }
        if(!data.password2){
            //TODO:请确认密码
            return false;
        }
        if(data.password !== data.password2){
            //TODO:密码不一致
            return false
        }
        //TODO:验证用户名是否已经存在
        //TODO:验证邮箱是否已经注册
        return true;
    }
    else if("login" === loginOrRegister){
        return true;
    }
}
function submitFrom(url,param,onSuccess,onFailure){
    $.post(url,param,function(data){
        if(data.isSuccess){
            onSuccess && onSuccess(data.data);
        }else{
            onFailure && onFailure(data.msg);
        }
    },"json");
}
$(function(){
    $("#topStatus #searchBtn").on("click",function(){

    });
    $("#topStatus #doLoginBtn").on("click",function(){
        $(".bodyMask").show();
        $("#loginPanel").slideDown("slow");
    });
    $("#loginPanel .closeBtn").on("click",function(){
        $(".bodyMask").hide();
        $("#loginPanel").slideUp("slow");
    });
    $("#topStatus #registerBtn").on("click",function(){
        $(".bodyMask").show();
        $("#registerPanel").slideDown("slow");
    });
    $("#registerPanel .closeBtn").on("click",function(){
        $("#registerPanel").slideUp("slow");
        $(".bodyMask").hide();
    });

    $("#registerPanel #doRegister").on("click",function(){
        var data = getValueFromInputArr($("#registerPanel"));
        validateForm(data,"register") && submitFrom("/doRegister",data,function(){
            //TODO:提示用户注册成功，关闭注册面板，刷新首页
            alert("注册成功");
            $("#registerPanel").slideUp("slow");
            $(".bodyMask").hide();

        },function(){
            //TODO:提示用户注册失败，提示详细信息
        });
    });

    $("#topStatus #topBarOptions").on("click",function(){

    });
});
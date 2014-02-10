/**
 * Created with WebStorm.
 * Author: ZhouZhongYu
 * Date: 14-1-14
 * Time: 上午11:32
 * 顶部栏 选项 搜索 用户功能
 */

$(function(){
    initTopBar();
    initRegisterPanel();
    initLoginPanel();
});

function initTopBar(){
    $("#topBarOptions").on("click",function(){});
    $("#searchBtn").on("click",function(){});

    $("#doLoginBtn").on("click",function(){
        $(".bodyMask").show();
        $("#loginPanel").slideDown("slow");
    });

    $("#registerBtn").on("click",function(){
        $(".bodyMask").show();
        $("#registerPanel").slideDown("slow");
    });
}

function initRegisterPanel(){
    $("#registerPanel .closeBtn").on("click",function(){
        $("#registerPanel").slideUp("slow");
        $(".bodyMask").hide();
    });

    $("#doRegister").on("click",function(){
        var data = getValueFromInputArr($("#registerPanel"));
        validateForm(data,"register") && submitFrom("/doRegister",data,onRegisterSuccess,onRegisterFailure);
        function onRegisterSuccess(msg){
            $("#registerPanel").slideUp("slow");
            $(".bodyMask").hide();
        }
        function onRegisterFailure(msg){
            if(msg.errCode === -1001){
                showErrorMsg($("#error-username"),msg.errMsgCn);
            }
            if(msg.errCode === -1002){
                showErrorMsg($("#error-email"),msg.errMsgCn);
            }
        }
    });
}
function initLoginPanel(){
    $("#loginPanel .closeBtn").on("click",function(){
        $(".bodyMask").hide();
        $("#loginPanel").slideUp("slow");
    });

    $("#doLogin").on("click",function(){
        var data = getValueFromInputArr($("#loginPanel"));
        validateForm(data,"register") && submitFrom("/doLogin",data, onLoginSuccess, onLoginFailure);
        function onLoginSuccess(msg){
            $("#registerPanel").slideUp("slow");
            $(".bodyMask").hide();
        }
        function onLoginFailure(msg){
            if(msg.errCode === -1001){
                showErrorMsg($("#error-username"),msg.errMsgCn);
            }
            if(msg.errCode === -1002){
                showErrorMsg($("#error-email"),msg.errMsgCn);
            }
        }
    });
}

function log(msg){
    console && console.log(msg);
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
function showErrorMsg($parent,msg){
    $parent.empty().append("<em class=\"text-danger\">" + msg + "</em>").show();
}
function validateEmail(email){
    var emailReg = /^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i;
    return emailReg.test(email);
}
function validateForm(data,loginOrRegister){
    $(".loginPanel .error-msg").each(function(){
        $(this).hide();
    });
    data = data || {};
    if("register" === loginOrRegister){
        if(!data.username){
            showErrorMsg($("#error-username"),"请输入称号");
            return false;
        }
        if(!data.email){
            showErrorMsg($("#error-email"),"请输入邮箱");
            return false;
        }
        if(!validateEmail(data.email)){
            showErrorMsg($("#error-email"),"邮箱不合法");
            return false;
        }
        if(!data.password){
            showErrorMsg($("#error-password"),"请设置密码");
            return false;
        }
        if(!data.password2){
            showErrorMsg($("#error-password2"),"请确认密码");
            return false;
        }
        if(data.password !== data.password2){
            showErrorMsg($("#error-password2"),"密码不一致");
            return false
        }
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
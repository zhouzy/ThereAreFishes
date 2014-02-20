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

/**
 * 初始化注册面板
 */
function initRegisterPanel(){
    $("#registerPanel .closeBtn").on("click",function(){
        $("#registerPanel").slideUp("slow");
        $(".bodyMask").hide();
    });

    $("#doRegister").on("click",function(){
        var data = getValueFromInputArr($("#registerPanel"));
        validateRegister(data)
            && submitFrom("/doRegister",data,onRegisterSuccess,onRegisterFailure);
        function onRegisterSuccess(msg){
            $("#registerPanel").slideUp("slow");
            $(".bodyMask").hide();
        }
        function onRegisterFailure(msg){
            if(msg.errCode === -1001){
                showErrorMsg($("#registerPanel .error-username"),msg.errMsgCn);
            }
            if(msg.errCode === -1002){
                showErrorMsg($("#registerPanel .error-email"),msg.errMsgCn);
            }
        }
    });
}

/**
 * 初始化登陆面板
 */
function initLoginPanel(){
    $("#loginPanel .closeBtn").on("click",function(){
        $(".bodyMask").hide();
        $("#loginPanel").slideUp("slow");
    });

    $("#doLogin").on("click",function(){
        var data = getValueFromInputArr($("#loginPanel"));
        validateLogin(data)
            && submitFrom("/doLogin",data, onLoginSuccess, onLoginFailure);
        function onLoginSuccess(msg){
            $("#topBarUser .topbar-userinfo-name").html(msg.username);
            msg.avertarUrl && $("#topBarUser .topbar-userinfo-avatar").attr("src",msg.avertarUrl);

            $("#topBarUser .login-reg").hide();
            $("#topBarUser .topbar-userinfo").show();

            $("#loginPanel").slideUp("slow");
            $(".bodyMask").hide();
        }
        function onLoginFailure(msg){
            if(msg.errCode === -1001){
                showErrorMsg($("#loginPanel .error-username"),msg.errMsgCn);
            }
            if(msg.errCode === -1002){
                showErrorMsg($("#loginPanel .error-email"),msg.errMsgCn);
            }
        }
    });
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

/**
 * 效验注册信息
 * @param data
 * @returns {boolean}
 */
function validateRegister(data){
    $(".loginPanel .error-msg").each(function(){
        $(this).hide();
    });
    data = data || {};
    if(!data.username){
        showErrorMsg($("#registerPanel .error-username"),"请输入称号");
        return false;
    }
    if(!data.email){
        showErrorMsg($("#registerPanel .error-email"),"请输入邮箱");
        return false;
    }
    if(!validateEmail(data.email)){
        showErrorMsg($("#registerPanel .error-email"),"邮箱不合法");
        return false;
    }
    if(!data.password){
        showErrorMsg($("#registerPanel .error-password"),"请设置密码");
        return false;
    }
    if(!data.password2){
        showErrorMsg($("#registerPanel .error-password2"),"请确认密码");
        return false;
    }
    if(data.password !== data.password2){
        showErrorMsg($("#registerPanel .error-password2"),"密码不一致");
        return false
    }
    return true;
}

/**
 * 效验登陆信息
 * @param data
 * @returns {boolean}
 */
function validateLogin(data){
    $(".loginPanel .error-msg").each(function(){
        $(this).hide();
    });
    data = data || {};
    if(!data.email){
        showErrorMsg($("#loginPanel .error-email"),"请输入邮箱");
        return false;
    }
    if(!validateEmail(data.email)){
        showErrorMsg($("#loginPanel .error-email"),"邮箱不合法");
        return false;
    }
    if(!data.password){
        showErrorMsg($("#loginPanel .error-password"),"请输入密码");
        return false;
    }
    return true;
}

/**
 * 提交from表单
 * @param url
 * @param param
 * @param onSuccess
 * @param onFailure
 */
function submitFrom(url,param,onSuccess,onFailure){
    $.post(url,param,function(data){
        if(data.isSuccess){
            onSuccess && onSuccess(data.data);
        }else{
            onFailure && onFailure(data.msg);
        }
    },"json");
}

function showErrorMsg($parent,msg){
    $parent.empty().append("<em class=\"text-danger\">" + msg + "</em>").show();
}

function validateEmail(email){
    var emailReg = /^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i;
    return emailReg.test(email);
}

function log(msg){
    console && console.log(msg);
}
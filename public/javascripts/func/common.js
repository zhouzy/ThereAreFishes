/**
 * Created with WebStorm.
 * Author: ZhouZhongYu
 * Date: 14-1-14
 * Time: 上午11:32
 * 顶部栏 选项 搜索 用户功能
 */

$(function(){
    menuOptionBar.init();
    leftMenuBar.init();
    signInPanel.init();
    signUpPanel.init();
});

var menuOptionBar = (function(){
    var o = new Component();
    o.init = function(){
        var timeoutHandler = null;
        $("#topBarOptions").on("mouseenter",function(){
            timeoutHandler && clearTimeout(timeoutHandler);
            _show();
        }).on("mouseleave",function(){
            timeoutHandler = setTimeout(_hide,1000);
        });

        $("#pin").on("click",function(){
            $("#topBarOptions").css("visibility","hidden");
            _hide();
            o.emit("menuOptionBar:pin_click");
        });
    };

    function _show(){
        $("#topBarOptions .menu").show();
        o.emit("menuOptionBar_open");
    }

    function _hide(){
        $("#topBarOptions .menu").hide();
        o.emit("menuOptionBar_close");
    }

    o.on("leftMenuBar:pin_click",function(){
        $("#topBarOptions").css("visibility","visible");
    });

    o.on("signInBar_open",function(){
        _hide();
    });

    return o;
}());

var leftMenuBar = (function(){
    var o = new Component();
    o.init = function(){
        $("#leftOptions a[data-title]").each(function(index,value){
           $(value).on("mouseenter",_getAddNavNameF(index + 1))
                  .on("mouseleave",_delNavName);
        });
        $("#leftOptions a:eq(0)").on("click",function(){
            _hide();
            o.emit("leftMenuBar:pin_click");
        });
    };

    function _getAddNavNameF(i){
        return function(e){
            var des = $(e.target).data("title"),
                top = i*51;
                $leftOptions = $("#leftOptions");
            if(des){
                $leftOptions.append(
                    '<div class="nav-des" style="top:' + top + 'px">' +
                        '<span class="narrow-left"></span>' +
                        '<span class="nav-des-right">' + des + '</span>' +
                    '</div>'
                );
            }
        }
    }

    function _show(){
        $("#leftOptions").show();
    }
    function _hide(){
        $("#leftOptions").hide();
    }

    function _delNavName(){
        $("#leftOptions .nav-des").remove();
    }

    o.on("menuOptionBar:pin_click",function(){
        _show();
    });
    return o;
}());

var signUpPanel = (function(){
    var o = new Component();
    o.init = function(){
        $("#signup-btn").on("click",_open);
        $("#signUpPanel .closeBtn").on("click",_close);
        $("#doRegister").on("click",function(){
            var data = getValueFromInputArr($("#signUpPanel"));
            validateRegister(data) && submitFrom("/doRegister",data,onRegisterSuccess,onRegisterFailure);
        });
    };

    function _close(){
        $("#signUpPanel").slideUp("slow");
        $(".bodyMask").hide();
        o.emit("signUpPanel_close");
    }

    function _open(){
        $(".bodyMask").show();
        $("#signUpPanel").slideDown("slow");
        o.emit("signUpPanel_open");
    }

    function onRegisterSuccess(msg){
        $("#signUpPanel").slideUp("slow");
        $(".bodyMask").hide();
        o.emit("signUpPanel_signUp_success");
    }

    function onRegisterFailure(msg){
        if(msg.errCode === -1001){
            showErrorMsg($("#signUpPanel .error-username"),msg.errMsgCn);
        }
        if(msg.errCode === -1002){
            showErrorMsg($("#signUpPanel .error-email"),msg.errMsgCn);
        }
    }

    function validateRegister(data){
        $(".signInPanel .error-msg").each(function(){
            $(this).hide();
        });
        data = data || {};
        if(!data.username){
            showErrorMsg($("#signUpPanel .error-username"),"请输入称号");
            return false;
        }
        if(!data.email){
            showErrorMsg($("#signUpPanel .error-email"),"请输入邮箱");
            return false;
        }
        if(!validateEmail(data.email)){
            showErrorMsg($("#signUpPanel .error-email"),"邮箱不合法");
            return false;
        }
        if(!data.password){
            showErrorMsg($("#signUpPanel .error-password"),"请设置密码");
            return false;
        }
        if(!data.password2){
            showErrorMsg($("#signUpPanel .error-password2"),"请确认密码");
            return false;
        }
        if(data.password !== data.password2){
            showErrorMsg($("#signUpPanel .error-password2"),"密码不一致");
            return false
        }
        return true;
    }

    o.on("menuOptionBar_open",_close);

    o.on("signInPanel_open",_close);

    return o;
}());

var signInPanel = (function(){
    var o = new Component();
    o.init = function(){
        $("#signin-btn").on("click",_open);
        $("#signInPanel .closeBtn").on("click",_close);
        $("#doLogin").on("click",function(){
            var data = getValueFromInputArr($("#signInPanel"));
            _validate(data) && submitFrom("/doLogin",data, _onSuccess, _onFailure);
        });
    };

    function _open(){
        $(".bodyMask").show();
        $("#signInPanel").slideDown("slow");
        o.emit("signInPanel_open");
    }

    function _close(){
        $(".bodyMask").hide();
        $("#signInPanel").slideUp("slow");
        o.emit("signInPanel_close");
    }

    function _validate(data){
        $(".signInPanel .error-msg").each(function(){
            $(this).hide();
        });
        data = data || {};
        if(!data.email){
            showErrorMsg($("#signInPanel .error-email"),"请输入邮箱");
            return false;
        }
        if(!validateEmail(data.email)){
            showErrorMsg($("#signInPanel .error-email"),"邮箱不合法");
            return false;
        }
        if(!data.password){
            showErrorMsg($("#signInPanel .error-password"),"请输入密码");
            return false;
        }
        return true;
    }

    function _onSuccess(msg){
        $("#topBarUser .topbar-userinfo-name").html(msg.username);
        msg.avertarUrl && $("#topBarUser .topbar-userinfo-avatar").attr("src",msg.avertarUrl);
        $("#topBarUser .signIn-reg").hide();
        $("#topBarUser .topbar-userinfo").show();
        _close();
        o.emit("signInPanel_signIn_success",msg);
    }

    function _onFailure(msg){
        if(msg.errCode === -1001){
            showErrorMsg($("#signInPanel .error-username"),msg.errMsgCn);
        }
        if(msg.errCode === -1002){
            showErrorMsg($("#signInPanel .error-email"),msg.errMsgCn);
        }
    }

    o.on("menuOptionBar_open",_close);

    o.on("signUpPanel_open",_close);

    return o;
}());

var topBar = (function(){
    var o = new Component();
    o.on("signUpPanel_signUp_success",_initUserInfo);
    o.on("signInPanel_signIn_success",_initUserInfo);
    function _initUserInfo(userInfo){
        $("#signin-btn,#signup-btn").css("display","none");
        $("#topbar-userinfo-upload,#topbar-userinfo-avatar").css("display","inline-block");
        $("#topbar-userinfo-avatar").on("mouseenter",function(){
            $("#topbar-userinfo-menu").css("display","inline-block");
        }).on("mouseleave",function(){
            $("#topbar-userinfo-menu").css("display","none");
        });
    }
}());

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
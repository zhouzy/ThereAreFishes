/**
 * Created with WebStorm.
 * Author: ZhouZhongYu
 * Date: 14-1-14
 * Time: 上午11:32
 * 顶部栏 选项 搜索 用户功能
 */

$(function(){
    topBarOptions.init();
    sidebar.init();
    signinPanel.init();
    signupPanel.init();
});

var topBarOptions = (function(){
    var o = new Component();
    o.init = function(){
        var timeoutHandler = null;
        $("#topbar-options").on("mouseenter",function(){
            timeoutHandler && clearTimeout(timeoutHandler);
            _show();
        }).on("mouseleave",function(){
            timeoutHandler = setTimeout(_hide,1000);
        });

        $("#pin").on("click",function(){
            $("#topbar-options").css("visibility","hidden");
            _hide();
            o.emit("topbar-options:pin_click");
        });
    };

    function _show(){
        $("#topbar-options .menu").show();
        o.emit("topbar-options:open");
    }

    function _hide(){
        $("#topbar-options .menu").hide();
        o.emit("topbar-options:close");
    }

    o.on("sidebar:pin_click",function(){
        $("#topbar-options").css("visibility","visible");
    });

    o.on("signInBar_open",function(){
        _hide();
    });

    return o;
}());

var sidebar = (function(){
    var o = new Component();
    o.init = function(){
        $("#sidebar a[data-title]").each(function(index,value){
           $(value).on("mouseenter",_getAddNavNameF(index + 1))
                  .on("mouseleave",_delNavName);
        });
        $("#sidebar a:eq(0)").on("click",function(){
            _hide();
            o.emit("sidebar:pin_click");
        });
    };

    function _getAddNavNameF(i){
        return function(e){
            var des = $(e.target).data("title"),
                top = i*51;
                $sidebar = $("#sidebar");
            if(des){
                $sidebar.append(
                    '<div class="nav-des" style="top:' + top + 'px">' +
                        '<span class="narrow-left"></span>' +
                        '<span class="nav-des-right">' + des + '</span>' +
                    '</div>'
                );
            }
        }
    }

    function _show(){
        $("#sidebar").show();
    }
    function _hide(){
        $("#sidebar").hide();
    }

    function _delNavName(){
        $("#sidebar .nav-des").remove();
    }

    o.on("topbar-options:pin_click",function(){
        _show();
    });
    return o;
}());

var signupPanel = (function(){
    var o = new Component();
    o.init = function(){
        $("#signup-btn").on("click",_open);
        $("#signup-panel .closeBtn").on("click",_close);
        $("#doRegister").on("click",function(){
            var data = getValueFromInputArr($("#signup-panel"));
            validateRegister(data) && submitFrom("/doRegister",data,onRegisterSuccess,onRegisterFailure);
        });
    };

    function _close(){
        $("#signup-panel").slideUp("slow");
        $(".bodyMask").hide();
        o.emit("signup-panel:close");
    }

    function _open(){
        $(".bodyMask").show();
        $("#signup-panel").slideDown("slow");
        o.emit("signup-panel:open");
    }

    function onRegisterSuccess(msg){
        $("#signup-panel").slideUp("slow");
        $(".bodyMask").hide();
        o.emit("signup-panel:signup-success");
    }

    function onRegisterFailure(msg){
        if(msg.errCode === -1001){
            showErrorMsg($("#signup-panel .error-username"),msg.errMsgCn);
        }
        if(msg.errCode === -1002){
            showErrorMsg($("#signup-panel .error-email"),msg.errMsgCn);
        }
    }

    function validateRegister(data){
        $(".signin-panel .error-msg").each(function(){
            $(this).hide();
        });
        data = data || {};
        if(!data.username){
            showErrorMsg($("#signup-panel .error-username"),"请输入称号");
            return false;
        }
        if(!data.email){
            showErrorMsg($("#signup-panel .error-email"),"请输入邮箱");
            return false;
        }
        if(!validateEmail(data.email)){
            showErrorMsg($("#signup-panel .error-email"),"邮箱不合法");
            return false;
        }
        if(!data.password){
            showErrorMsg($("#signup-panel .error-password"),"请设置密码");
            return false;
        }
        if(!data.password2){
            showErrorMsg($("#signup-panel .error-password2"),"请确认密码");
            return false;
        }
        if(data.password !== data.password2){
            showErrorMsg($("#signup-panel .error-password2"),"密码不一致");
            return false
        }
        return true;
    }

    o.on("topbar-options:open",_close);

    o.on("signin-panel:open",_close);

    return o;
}());

var signinPanel = (function(){
    var o = new Component();
    o.init = function(){
        $("#signin-btn").on("click",_open);
        $("#signin-panel .closeBtn").on("click",_close);
        $("#doLogin").on("click",function(){
            var data = getValueFromInputArr($("#signin-panel"));
            _validate(data) && submitFrom("/doLogin",data, _onSuccess, _onFailure);
        });
    };

    function _open(){
        $(".bodyMask").show();
        $("#signin-panel").slideDown("slow");
        o.emit("signin-panel:open");
    }

    function _close(){
        $(".bodyMask").hide();
        $("#signin-panel").slideUp("slow");
        o.emit("signin-panel:close");
    }

    function _validate(data){
        $(".signin-panel .error-msg").each(function(){
            $(this).hide();
        });
        data = data || {};
        if(!data.email){
            showErrorMsg($("#signin-panel .error-email"),"请输入邮箱");
            return false;
        }
        if(!validateEmail(data.email)){
            showErrorMsg($("#signin-panel .error-email"),"邮箱不合法");
            return false;
        }
        if(!data.password){
            showErrorMsg($("#signin-panel .error-password"),"请输入密码");
            return false;
        }
        return true;
    }

    function _onSuccess(data){
        _close();
        o.emit("signin-panel:signin-success",data);
    }

    function _onFailure(msg){
        if(msg.errCode === -1001){
            showErrorMsg($("#signin-panel .error-username"),msg.errMsgCn);
        }
        if(msg.errCode === -1002){
            showErrorMsg($("#signin-panel .error-email"),msg.errMsgCn);
        }
    }

    o.on("topbar-options:open",_close);

    o.on("signup-panel:open",_close);

    return o;
}());

var topBar = (function(){
    var o = new Component();
    o.on("signup-panel:signup-success",_initUserInfo);
    o.on("signin-panel:signin-success",_initUserInfo);
    function _initUserInfo(userInfo){
        $("#signin-btn,#signup-btn").css("display","none");
        $("#topbar-userinfo-avatar>img").attr("url",userInfo.avertarUrl);
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
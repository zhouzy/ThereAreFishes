(function(window){
    var eventsQueue = {},
        Component = function(){};
    Component.prototype={
        on:function(event,callback){
            if(eventsQueue[event] && eventsQueue[event].push){
                eventsQueue[event].push(callback);
            }
            else{
                eventsQueue[event] = [callback];
            }
            return this;
        },
        emit:function(event,data){
            if(eventsQueue[event] && eventsQueue[event].push){
                for(var i=0; i<eventsQueue[event].length; i++){
                    eventsQueue[event][i].call(window,data);
                }
            }
            return this;
        }
    };
    window.Component = Component;
}(window));

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
        if(data.code == "success"){
            onSuccess && onSuccess(data.data);
        }else{
            onFailure && onFailure(data.message);
        }
    },"json");
}

function requiredInput(){
    $(".input.required").on("blur",function(e){
        var $this = $(e.target);
        if($this.val() === ""){
            $this.addClass("required-warm");
            $this.attr("placeholder","该项为必填项，请输入");
        }
        else{
            $this.removeClass("required-warm");
            $this.attr("placeHolder","");
        }
    });
}

function ifFillInInput($parent){
    var re = true;
    $parent = $parent || $(document);
    $(".input.required",$parent).each(function(){
        if($(this).val() === ""){
            $(this).addClass("required-warm");
            $this.attr("placeholder","该项为必填项，请输入");
            re = false;
        }
    });
    return re;
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


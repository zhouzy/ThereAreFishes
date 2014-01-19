/**
 * Created with WebStorm.
 * Author: ZhouZhongYu
 * Date: 14-1-14
 * Time: 上午11:32
 * 顶部栏 选项 搜索 用户功能
 */
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

function validateForm(from,loginOrRegister){
    var $from = $(from)
        ,email = $(".email",$from).val() || ""
        ,password = $(".password",$from).val() || "";
    if("register" === loginOrRegister){
        var password2 = $(".password2",$from).val() || "";
        if(email && password && password === password2){
            return true;
        }
        return false;
    }
    else if("login" === loginOrRegister){
        return true;
    }
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
    $("#topStatus #topBarOptions").on("click",function(){

    });
});
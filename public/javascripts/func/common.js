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
$(function(){
    $("#topStatus #searchBtn").on("click",function(){

    });
    $("#topStatus #doLoginBtn").on("click",function(){
        $(".bodyMask").show();
        $("#loginPanel").slideDown("slow");
    });
    $("#loginPanel .closeBtn").on("click",function(){
        $("#loginPanel").slideUp("slow");
    });
    $("#topStatus #newUserBtn").on("click",function(){

    });
    $("#topStatus #topBarOptions").on("click",function(){

    });
});
var users = require("../dao/users")
    ,fishing = require("../dao/fishing");

exports.index = function(req, res){
    var model = {
        title:"这儿有鱼"
    };

    function userListCallBack(userList){
        for(var user in userList){
            fishing.getFishingByUserId(user.userId,function(fishing){
                user.fishing = fishing;
            })
        }
    }

    function render(){
        users.getUserList( userListCallBack);
    }

    res.render('index',model);
};


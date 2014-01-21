var dao = require("../dao");

exports.userRoute = require("./lib/user");

exports.index = function(req, res){
    var userCount = 0;
    var model = {
        title:"这儿有鱼"
    };

    function userListCallBack(userList){
        model.itemList = userList;
        userCount = userList.length;
        for(var i= 0,j=userList.length;i<j;i++){
            getFishingByUserId(i);
        }
    }

    function getFishingByUserId(i){
        dao.fishingDao.getFishingByUserId(model.itemList[i].userId,function(fishings){
            userCount--;
            model.itemList[i].fishings = fishings;
            if(userCount === 0){
                console.log(JSON.stringify(model));
                res.render('index',model);
            }
        });
    }
    dao.userDao.query(userListCallBack);
};


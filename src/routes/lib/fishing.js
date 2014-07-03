/**
 * Created with WebStorm.
 * Author: ZhouZhongYu
 * Date: 14-5-5
 * Time: 下午5:00
 */
var fishingDao  = require("../../dao").activityDao,
    common      = require("../../common"),
    utils       = common.utils,
    userSession = common.userSeesion;
    page        = common.page;

var Fishing = exports = module.exports = {};
var model = {"title":"活动页面"}

Fishing.addFishingPage = function(req, res){
    console.log("渔获->添加渔获页面");
    res.render("fishing/addFishingPage.jade");
};

Fishing.add = function(req, res){
    console.log("渔获->提交渔获:" + JSON.stringify(req.body));
    var fishing = req.body;
    fishing.userId = userSession.getUserId(req);

    fishingDao.addFishing(fishing).then(function(){
        res.end(JSON.stringify(utils.getMessageJSON()));
    }).fail(utils.getFailFn(true,res));
};

Fishing.list = function(req, res){
}

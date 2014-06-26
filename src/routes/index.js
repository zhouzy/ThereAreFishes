var dao        = require("../dao"),
    fishingDao = dao.fishingDao,
    userDao    = dao.userDao,
    common     = require("../common"),
    utils      = common.utils,
    page       = common.page;

exports.userRoute = require("./lib/user");
exports.activity = require("./lib/activity");

exports.index = function(req, res){
    var model = {
        title:"这儿有鱼"
    };
    fishingDao.getFishings(page.getPageInfo(1,10)).then(function(fishings){
        var promisesfn = [];
        for(var fishing in fishings){
            promisesfn.push(userDao.getUser(fishing.userId));
        }
        return Q.all(promisesfn).then(function(user){

        });
    }).then(function(fishings){
        model.itemList = fishings;
        res.render('index',model);
    }).fail(utils.getFailFn(false,res,"index",model));
};


var dao        = require("../dao"),
    fishingDao = dao.fishingDao,
    userDao    = dao.userDao,
    common     = require("../common"),
    utils      = common.utils,
    page       = common.page,
    Q          = require("q");

exports.userRoute = require("./lib/user");
exports.activity = require("./lib/activity");

exports.index = function(req, res){
    var model = {
        title:"这儿有鱼"
    };
    fishingDao.getFishings(page.getPageInfo(1,10)).then(function(fishings){

        var promises = [];

        fishings.forEach(function(fishing){
            promises.push(userDao.getUser(fishing.userId));
        });

        Q.all(promises).then(function(users){
            fishings.forEach(function(fishing,index){
                fishing.user = users[index];
            });
            model.itemList = fishings;
            res.render('index',model);
        }).fail(utils.getFailFn(false,res,"index",model));
    });
};


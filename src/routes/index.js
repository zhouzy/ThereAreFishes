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
        var i = 0;
        fishings.forEach(function(fishing){
            userDao.getUser(fishing.userId).then(function(user){
                i++;
                fishing.user = user;
                if(i == fishings.length-1){
                    res.render('index',model);
                }
            }).fail(utils.getFailFn(false,res,"index",model));
        });


    });
};


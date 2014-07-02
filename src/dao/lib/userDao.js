/**
 * Created with JetBrains WebStorm.
 * Author: ZhouZhongYu
 * Date: 13-12-27
 * Time: 下午5:23
 * To change this template use File | Settings | File Templates.
 */
var Q          = require("q"),
    common     = require('../../common'),
    dbUtils    = common.dbUtils,
    UserSchema = require('../../Schema/mySchema').User,
    model      = dbUtils.getDB().model("User",UserSchema);

var userDao  = exports = module.exports = {},
    QFind    = Q.nfbind(model.find.bind(model)),
    QFindOne = Q.nfbind(model.findOne.bind(model)),
    QCreate  = Q.nfbind(model.create.bind(model));

/**
 * 查询用户列表
 * @param callback
 */
userDao.query = function(){
    return QFind({},{lean:true});
};

userDao.getUser = function(userId){
    return QFindOne({userId:userId},{},{lean:true});
}

/**
 * 注册新用户
 * @param user
 */
userDao.addUser = function(user){
    return QCreate(user);
};

/**
 * 用户登陆
 * @param email
 * @param password
 */
userDao.login = function(email, password){
    return QFindOne({email:email,password:password},{},{lean:true});
};

/**
 * 检查用户名是否已经存在
 * @param username
 * @param emitter
 * @private
 */
userDao.checkUsername = function(username){
    return QFindOne({username:username},{},{lean:true});
}

/**
 * 检查邮箱是否已经注册
 * @param email
 * @param emitter
 * @private
 */
userDao.checkEmail = function(email){
    return QFindOne({email:email},{},{lean:true});
}

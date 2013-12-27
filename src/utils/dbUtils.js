/**
 * Created with JetBrains WebStorm.
 * Author: ZhouZhongYu
 * Date: 13-12-27
 * Time: 上午11:39
 * To change this template use File | Settings | File Templates.
 */
var cradle = require('cradle'),
    c = new(cradle.Connection)("127.0.0.1","5984",{cache: false, raw: false}),
    db = c.database("there_are_fishes");
exports.query = function(docId,callback){
    db.get(docId,function(err,doc){
        if(err){
            console.log("-数据库错误:"+err);
            callback(null);
        }else{
            callback(doc.userList);
        }
    });
}

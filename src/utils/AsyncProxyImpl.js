/**
 * Created with JetBrains WebStorm.
 * Author: ZhouZhongYu
 * Date: 14-1-2
 * Time: 下午4:25
 * To change this template use File | Settings | File Templates.
 */
var events = require("events"),
    util = require('util');
var AsyncProxy = module.exports = function(){
    events.EventEmitter.call(this);
};
util.inherits(AsyncProxy, events.EventEmitter);

AsyncProxy.prototype.proxy = function() {
    var _this = this,
        args = Array.prototype.slice.call(arguments),
        len = args.length;

    // 三个以上参数才符合我们的预期，也就是异步执行代码前提。
    if (len < 3) {
        console.error('至少需要三个参数，分别是：evt1, evt2, callback');
        return;
    }

    this.callback = args.pop();
    --len;

    this.args = new Array(len);
    this.len = len;

    // max size limit
    if (len > 10) {
        this.setMaxListeners(len);
    }

    args.forEach(function(item, i) {
        _this.on(item, function(data) {
            _this.args[i] = data;
            if (!--_this.len) {
                this.callback.apply(_this, _this.args);
            }
        });
    });
};
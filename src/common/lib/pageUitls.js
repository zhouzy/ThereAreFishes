/**
 * Created by zhouzhongyu on 14-6-25.
 */
var PageUtils = exports = module.exports = {};

PageUtils.getPageInfo = function(page,rows){
    return new PageInfo(page,rows);
}

var PageInfo = function(page,rows){
    if(page === undefined){
        page = 1;
    }
    if(rows === undefined){
        rows = 10;
    }

    this._page = parseInt(page);
    this._rows = parseInt(rows);
}

PageInfo.prototype.getPage =  function(){
    return this._page;
};

PageInfo.prototype.getRows = function(){
    return this._rows;
};

PageInfo.prototype.setPage = function(page){
    this._page = parseInt(page);
};

PageInfo.prototype.setRows = function(){
    this._rows = parseInt(rows);
}

PageInfo.prototype.getSkip = function(){
    var skip = (this._page-1) * this._rows;
    skip<0 && (skip = 0);
    return skip;
}

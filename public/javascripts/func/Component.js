(function(window){
    var eventsQueue = {},
        Component = function(){};
    Component.prototype={
        on:function(event,callback){
            if(eventsQueue[event] && eventsQueue[event].push){
                eventsQueue[event].push(callback);
            }
            else{
                eventsQueue[event] = [callback];
            }
            return this;
        },
        emit:function(event,data){
            if(eventsQueue[event] && eventsQueue[event].push){
                for(var i=0; i<eventsQueue[event].length; i++){
                    eventsQueue[event][i].call(data);
                }
            }
            return this;
        }
    };
    window.Component = Component;
}(window));

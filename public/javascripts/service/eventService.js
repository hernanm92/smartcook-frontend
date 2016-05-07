module.service('eventService', function($interval,callbackHandler, $q){
  //hacer mapa
  var handlers={};
  var getAdecuateCallbackHandler=function(type){
    type=type||"common";
    if(handlers[type]){
      return handlers[type];
    }
    handlers[type]=callbackHandler.getNewHandler();
    return handlers[type];
  };

  var statusCron = function(callback,type){
    var handler=getAdecuateCallbackHandler(type);
    handler.add(callback);
    if (callback.length > 1) {
      var promise = $q(function (resolve, reject) {
        callback(resolve, reject);
      });
      promise.finally(function () {
        handler.start();
      });
    } else {
      callback();
      handler.start();
    }
  };
  var times=0;
  var clear = function(type){
    times=0;
    var handler=getAdecuateCallbackHandler(type);
    handler.stop();
    handler.clear();
  };
  var calculateTime=function(timesRepeat){
    return 5000*timesRepeat;
  };
  var extendTimer=function(type){
    times++;
    var timeout=50000;
    if(type){
      var handler=getAdecuateCallbackHandler(type);
      timeout = handler.extendTimer(times);
      return timeout;
    }
    if(times < 10){ //se supone q si es mas de 10 veces, que reintente cada 50s, sujeto a cambios: opcion 2 -> no reintentar mas dsp de n veces
      timeout=calculateTime(times);
      angular.forEach(handlers,function(theHandler){
        var posibleTimer=theHandler.extendTimer(times);
        timeout = posibleTimer>timeout ? posibleTimer : timeout;
      });
    }
    return timeout;
  };
  var setTimer=function(type,timer){
    if(!type) {
      return;
    }
    var handler=getAdecuateCallbackHandler(type);
    handler.setTimer(timer);
  };

  var stop = function(type){
    if(!type) {
      return;
    }
    var handler=getAdecuateCallbackHandler(type);
    handler.stop();
  };
  var start = function(type){
    if(!type) {
      return;
    }
    var handler=getAdecuateCallbackHandler(type);
    handler.start();
  };
  return {
    statusCron: statusCron,
    clear: clear,
    extendTimer:extendTimer,
    setTimer:setTimer,
    start: start,
    stop: stop
  };
});

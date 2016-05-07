module.service('callbackHandler', function($q){
  function Handler() {
    this.running=false;
    this.callbacks=[];
    this.ticking = false;
    this.interval=1000*5; // default interval 5s
    this.timer = null;

    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
      this.hidden = "hidden";
      this.visibilityChange = "visibilitychange";
    } else if (typeof document.mozHidden !== "undefined") {
      this.hidden = "mozHidden";
      this.visibilityChange = "mozvisibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      this.hidden = "msHidden";
      this.visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      this.hidden = "webkitHidden";
      this.visibilityChange = "webkitvisibilitychange";
    }

    this.makeCalls = function(cb){
      var promises = [];
      angular.forEach(this.callbacks, function(callback){
        if (callback.length > 1) {
          promises.push($q(function (resolve, reject) {
            callback(resolve, reject);
          }));
        } else {
          callback();
        }
      });
      if (promises.length > 0) {
        $q.all(promises).finally(function() {
          cb();
        });
      } else {
        cb();
      }
    };

    this.add = function(callback){
      this.callbacks.push(callback);
    };

    this.clear = function(){
      clearTimeout(this.timer);
      this.removeElementsOnWindow();
      this.callbacks=[];
      this.running=false;
    };

    this.setTimer = function(newTimer){
      this.interval = newTimer;
    };

    this.tick = function(){
      var self = this;
      this.timer = setTimeout(function(){
        self.ticking=false;
        var hidden = (document.hidden || document.webkitHidden || document.mozHidden || document.msHidden || false);
        if(self.running && !self.ticking){
          if(!hidden){
            self.makeCalls(function () {
              self.tick();
            });
          }
        }
      }, this.interval);
      this.ticking=true;
    };

    this.extendTimer = function(times){
      this.removeElementsOnWindow();
      this.setTimer((times+1)*this.interval);
      return this.interval;
    };

    this.trigger = function() {
      if (document[this.hidden]) {
        clearTimeout(this.timer);
      } else {
        var self = this;
        this.makeCalls(function() {
          if (!this.timer) {
            self.tick();
          }
        });
      }
    }.bind(this);

    this.addEventsOnWindow = function(){
      window.document.addEventListener(this.visibilityChange, this.trigger);
    };

    this.removeElementsOnWindow = function(){
      window.document.removeEventListener(this.visibilityChange, this.trigger);
    };

    this.start = function(newTimer){ //devuelve true si lo arranca y
      if(!this.running){
        this.running=true;
        if (newTimer) {
          this.interval = newTimer;
        }
        this.addEventsOnWindow();
        this.tick();
        return;
      }
      return;
    };

    this.stop = function(){
      clearTimeout(this.timer);
      this.running=false;
      this.removeElementsOnWindow();
    };
  }

  var getNewHandler = function(){
    return new Handler();
  };

  return {
    getNewHandler: getNewHandler
  };
});

module.service('failedRequestHandler', function(){
    var lastCheck = Date.now
    var allowed = 10
    var interval = 30
    var timesChecked = 0;
    var add = function (callback){
        if(((Date.now - lastCheck).getTime / 1000) > interval){
            timesChecked = 0
            lastCheck = Date.now
        }else{
            timesChecked++
            if(timesChecked > allowed){
                callback();
            }
        }
    }
    return{
        add: add
    }
});

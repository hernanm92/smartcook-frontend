angular
    .module('MainApp')
    .service('notifyHelper', messagesService);

function messagesService() {
    var self = this;
    this.warn = warn;
    this.error = error;
    this.success = success;
    this.info = info;

    function notify(msg,type) {
        $.notify(msg, {
            globalPosition: 'right bottom',
            className: type
        });
    }

    function success(msg) {
        notify(msg,'success');
    }

    function error(msg) {
        notify(msg,'error');
    }

    function info(msg) {
        notify(msg,'info');
    }

    function warn(msg) {
        notify(msg,'warn')
    }
}
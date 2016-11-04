angular
    .module('MainApp')
    .service('notifyHelper', notifyHelper);

function notifyHelper(ngNotify) {
    var self = this;
    this.warn = warn;
    this.error = error;
    this.success = success;
    this.info = info;
    init();
    function init() {

        ngNotify.config({
            theme: 'pure',
            position: 'bottom',
            duration: 2200,
            sticky: false,
            button: true,
            html: false,
        });
    }

    function notify(msg, type) {
        ngNotify.set(msg, type);
    }

    function success(msg) {
        notify(msg, 'success');
    }

    function error(msg) {
        notify(msg, 'error');
    }

    function info(msg) {
        notify(msg, 'info');
    }

    function warn(msg) {
        notify(msg, 'warn')
    }
}
angular
    .module('MainApp')
    .service('facebookService', facebookService);

function facebookService($q, $window, $location, blockUI, UserSession) {
    var self = this;
    self.login = login;
    self.getUsername = getUsername;
    self.logOut = logOut;
    self.watchAuthenticationStatusChange = watchAuthenticationStatusChange;
    self.facebookEvents = ['auth.statusChange', 'auth.login', 'auth.logout'];

    function login() {
        var deferred = $q.defer();
        FB.login(function (response) {
            if (response.status === 'connected') {
                deferred.resolve(response);
            } else {
                deferred.reject(null);
            }
        },{scope: 'email,public_profile'});
        return deferred.promise;
    }

    function getUsername() {
        var deferred = $q.defer();
        FB.api('/me', {
            fields: 'last_name'
        }, function (response) {
            if (!response || response.error) {
                deferred.reject('Error occured');
            } else {
                deferred.resolve(response.last_name);
            }
        });
        return deferred.promise;
    }

    function logOut() {
        var defer = $q.defer();
        blockUI.start();
        FB.logout(function (response) {
            if (!response || response.error) {
                defer.reject('Error occured');
            } else {
                defer.resolve(response);
            }
        });
        blockUI.stop();
        return defer.promise;
    }

    function watchAuthenticationStatusChange() {
        var defer = $q.defer();
        blockUI.start();
        FB.getLoginStatus(function (response) {
            if (!response || response.error) {
                defer.reject('Error occured');
            } else {
                defer.resolve(response);
            }
        });
        blockUI.stop();
        return defer.promise;
    }
}
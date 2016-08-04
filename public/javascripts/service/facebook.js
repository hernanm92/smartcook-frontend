angular
    .module('MainApp')
    .service('facebookService', facebookService);

function facebookService($q, UserSession, $window, $location) {
    var services = {
        login: login,
        getUsername : getUsername
    }
    return services;

    function login() {
        var deferred = $q.defer();
        FB.login(function (response) {
            if (response.status === 'connected') {
                deferred.resolve(response);
            } else {
                deferred.reject(null);
            }
        });
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
}
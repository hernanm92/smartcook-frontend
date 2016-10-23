var module = angular.module('userModule', ['ngResource']);

module.factory('userLoginFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/sessions');
}]);

module.factory('userFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/users/:id', { id: "@id" }, {
        update: {
            method: 'PUT'
        }
    });
}]);

module.factory('userLoginFacebook', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/login/facebook/:id', { id: "@id" })
}]);
var module = angular.module('userModule', ['ngResource']);

module.factory('userLoginFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/login');
}]);

module.factory('userFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/user/:text', { text: "@text" });
}]);
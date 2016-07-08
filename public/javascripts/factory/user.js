var module = angular.module('userModule', ['ngResource']);

module.factory('userFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/login');
}]);
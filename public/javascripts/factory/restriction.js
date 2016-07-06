var module = angular.module('restrictionModule', ['ngResource']);

module.factory('restrictionFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/restrictions');
}]);
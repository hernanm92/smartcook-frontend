var module = angular.module('badgeModule', ['ngResource']);

module.factory('badgeFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/badges/:id');
}]);

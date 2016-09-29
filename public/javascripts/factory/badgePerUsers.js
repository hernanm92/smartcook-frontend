var module = angular.module('badgeModule', ['ngResource']);

module.factory('badgePerUserFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/badges/:id');
}]);

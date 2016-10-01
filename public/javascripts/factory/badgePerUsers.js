var module = angular.module('badgePerUserModule', ['ngResource']);

module.factory('badgePerUserFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/badges_per_users/:id');
}]);

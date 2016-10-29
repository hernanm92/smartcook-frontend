var module = angular.module('commensalPerUserModule', ['ngResource']);

module.factory('commensalPerUserFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/users/:id/frequent_users', { id: "@id" });
}]);
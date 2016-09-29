var module = angular.module('frequentCommensalModule', ['ngResource']);

module.factory('frequentCommensalFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/frequent_users/:id', { id: "@id" });
}]);
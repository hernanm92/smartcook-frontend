var module = angular.module('frequentCommensalModule', ['ngResource']);

module.factory('frequentCommensalFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/frequent_commensal/:username', { username: "@username" });
}]);
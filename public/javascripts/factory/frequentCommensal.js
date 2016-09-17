var module = angular.module('frequentCommensalModule', ['ngResource']);

module.factory('frequentCommensalFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/frequentCommensal/:username', { username: "@username" });
}]);
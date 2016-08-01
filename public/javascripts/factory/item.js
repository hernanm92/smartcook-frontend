var module = angular.module('itemModule', ['ngResource']);

module.factory('itemFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/items/:text',{text : "@text"});
}]);

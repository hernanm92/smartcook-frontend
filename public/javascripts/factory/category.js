var module = angular.module('categoryModule', ['ngResource']);

module.factory('categoriesFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/categories');
}]);

module.factory('categoriesFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/categories/:text', {text: "@text"});
}]);

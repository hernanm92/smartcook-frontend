var module = angular.module('categoryModule', ['ngResource']);

module.factory('categoriesFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/food_categories/:id', { id: '@id' });
}]);

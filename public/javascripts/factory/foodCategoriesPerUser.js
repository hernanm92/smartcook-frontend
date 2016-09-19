var module = angular.module('foodCategoriesPerUserModule', ['ngResource']);

module.factory('foodCategoriesPerUserFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/food_categories_per_users/:username', { username: "@username" });
}]);
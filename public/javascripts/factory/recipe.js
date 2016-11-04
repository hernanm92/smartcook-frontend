var module = angular.module('recipeModule', ['ngResource']);

module.factory('recipeFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/recipes/:id', { id: "@id" }, {
        update: {
            method: 'PUT'
        },
        search: {
            method: 'POST',
            url: config.domain + '/recipes/search',
            data: {
                ingredients: '@ingredients',
                excluded_ingredients: '@excluded_ingredients',
                food_categories: '@food_categories',
                vegan: '@vegan',
                vegetarian: '@vegetarian',
                celiac: '@celiac',
                diabetic: '@diabetic'
            },
            isArray: true
        }
    });
}]);


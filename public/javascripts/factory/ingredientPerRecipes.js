var module = angular.module('ingredientPerRecipeModule', ['ngResource']);

module.factory('ingredientPerRecipeFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/ingredients_per_recipes/recipe/:id/ingredient, {id: "@id",}, {
    	update: {
    		method: 'PUT'
    	}
    });
}]);
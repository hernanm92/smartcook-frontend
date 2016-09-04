var module = angular.module('ingredientPerRecipeModule', ['ngResource']);

module.factory('ingredientPerRecipeFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/ingredients_per_recipes/:id', {id: "@id"}, {
    	update: {
    		method: 'PUT'
    	}
    });
}]);
var module = angular.module('ingredientPerRecipeModule', ['ngResource']);

module.factory('ingredientPerRecipeFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/ingredients_per_recipes/recipe/:recipe_id/ingredient/:ingredient_id', 
			{recipe_id: "@recipe_id",ingredient_id:"@ingredient_id"}, {
    	update: {
    		method: 'PUT'
    	}
    });
}]);

module.factory('ingredientPerRecipePersistFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/ingredients_per_recipes/');
}]);
var module = angular.module('ingredientPerUserModule', ['ngResource']);

module.factory('ingredientPerUserFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/ingredients_per_users/:id', 
			{id: "@id"}, {
    	update: {
    		method: 'PUT'
    	}
    });
}]);
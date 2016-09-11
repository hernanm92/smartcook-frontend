var module = angular.module('recipeModule', ['ngResource']);

module.factory('recipeFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/recipes/:id', {id: "@id"}, {
    	update: {
    		method: 'PUT'
    	}
    });
}]);

module.factory('recipeSearchFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/recipes/search');
}]);

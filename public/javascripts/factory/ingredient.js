var module = angular.module('ingredientModule', ['ngResource']);

module.factory('ingredientFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/ingredients/:id', {id: "@id"}, {
    	update: {
    		method: 'PUT'
    	}
    });
}]);

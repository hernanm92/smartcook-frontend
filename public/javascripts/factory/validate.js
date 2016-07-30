var module = angular.module('validateModule', ['ngResource']);

module.factory('validateFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/validateRecipe/:id', {id: "@id"}, {
    	update: {
    		method: 'PUT'
    	}
    });
}]);

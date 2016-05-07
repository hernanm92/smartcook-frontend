var module = angular.module('applicationModule', ['ngResource']);

module.factory('applicationFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/applications/:id', {id: "@id"}, {
    	update: {
    		method: 'PUT'
    	}
    });
}]);

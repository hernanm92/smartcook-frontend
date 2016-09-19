var module = angular.module('recipePerUserModule', ['ngResource']);

module.factory('recipePerUserFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/recipes_per_users',{ },{
        update: {
            method: 'PUT'
        }
    });
}]);
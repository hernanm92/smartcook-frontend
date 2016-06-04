var module = angular.module('ingredientModule', ['ngResource']);

module.factory('ingredientFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/ingredients/:id', {id: "@id"}, {
    	update: {
    		method: 'PUT'
    	}
    });
}]);


//API REST: ingredient
//
// (get)    GET /ingredients/:id
// (query)  GET /ingredients
// (save)   POST /ingredients {name: 'nombre', apellido: ''}
// (update) PUT /ingredients/:id {name: 'nombre', apellido: ''}
// (delete) DELETE /ingredients/:id


//ingredientFactory.query({},function(ingredients){
    //$scope.ingredients=ingredients;
//});
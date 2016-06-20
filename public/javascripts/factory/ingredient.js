var module = angular.module('ingredientModule', ['ngResource']);

module.factory('ingredientFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/ingredients/id/:id', {id: "@id"}, {
    	update: {
    		method: 'PUT'
    	}
    });
}]);

//lo puse asi xq no sabia como diferenciar de /:id a /:text
module.factory('ingredientFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/ingredients/:text', {text: "@text"});
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
module.factory('tipFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/tips/:id', { id: "@id" }, {
        update: {
            method: 'PUT'
        }
    });
}]);
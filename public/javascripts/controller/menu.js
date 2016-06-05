app.controller('MenuController', function ($scope, $controller, $location,  $timeout, $rootScope, eventService, config) {
    $scope.isNavActive = function(id) {

        return $location.path() == id
    };

});
app.controller('MenuController', function ($scope, $controller, $location,  $timeout, $rootScope, config) {
    $scope.isNavActive = function(id) {

        return $location.path() == id
    };

});
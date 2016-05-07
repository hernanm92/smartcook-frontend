app.controller('BaseController',
    function ($scope, selectedParams) {
        $scope.app_name = selectedParams.getAppName();
    }
);
app.controller('RecipeModalController',
    function ($scope, item, $modalInstance, $location,$controller) {
        angular.extend(this, $controller('baseRecipeController', {$scope: $scope}));
        $scope.ok = ok;
        $scope.cancel = cancel;

        init();

        function init() {
            $scope.recipe = item;
        };

        function ok() {
            $modalInstance.close();
        };

        function cancel() {
            $modalInstance.dismiss('cancel');
        };
    });
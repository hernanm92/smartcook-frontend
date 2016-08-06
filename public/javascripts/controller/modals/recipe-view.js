app.controller('RecipeViewController',
    function ($scope, item,$modalInstance) {
        $scope.recipe = item;
        
        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
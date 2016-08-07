app.controller('IngredientViewController',
    function ($scope, item,$modalInstance) {
        $scope.ingredient = item;
        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
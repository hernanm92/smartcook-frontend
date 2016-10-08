app.controller('EditRecipeController', EditRecipeController);

function EditRecipeController($scope, recipeService, $routeParams, $controller, $window, blockUI) {
    angular.extend(this, $controller('baseRecipeController', { $scope: $scope }));

    init();
    $scope.recipe = recipeService.create();
    function init() {
        var id = $routeParams.id;
        blockUI.start();
        recipeService.getDetailRecipe(id).then(function (recipe) {
            $scope.recipe = recipe;
            $scope.units = recipeService.getUnits();
            blockUI.stop();
            initBaseController();
        })
    }

    function initBaseController() {
        $scope.messageConfirmation = "La receta sera editada, desea continuar?";
        $scope.titleConfirmation = "Editar Receta";
        $scope.action = recipeService.edit;
    }
}

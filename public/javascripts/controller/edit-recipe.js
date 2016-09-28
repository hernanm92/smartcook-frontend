app.controller('EditRecipeController', EditRecipeController);

function EditRecipeController($scope, recipeService, $routeParams, $controller, $window) {
    angular.extend(this, $controller('baseRecipeController', { $scope: $scope }));

    init();

    function init() {
        var id = $routeParams.id;
        $scope.recipe = recipeService.getDetailRecipe(id);
        $scope.units = recipeService.getUnits();
        initBaseController();
    }

    function initBaseController() {
        $scope.messageConfirmation = "La receta sera editada, desea continuar?";
        $scope.titleConfirmation = "Editar Receta";
        $scope.action = recipeService.edit;
    }

    function setUnits() {
        angular.forEach($scope.recipe.ingredients, function (ing) {
            ing.unit = {}
            ing.unit.name = 'mililitro';
        })
    }
}

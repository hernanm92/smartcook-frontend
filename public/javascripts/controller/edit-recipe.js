app.controller('EditRecipeController', EditRecipeController);

function EditRecipeController($scope, recipeService, $routeParams, $controller) {
    angular.extend(this, $controller('baseRecipeController', { $scope: $scope }));

    init();

    function init() {
        var id = $routeParams.id;
        $scope.recipe = recipeService.getDetailRecipe(id);
        $scope.units = recipeService.getUnits();
    }
    function setUnits() {
        angular.forEach($scope.recipe.ingredients, function (ing) {
            ing.unit = {}
            ing.unit.name = 'mililitro';
        })
    }
}

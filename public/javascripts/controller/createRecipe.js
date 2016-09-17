app.controller('CreateRecipeController',
    function ($controller, $scope, recipeService, $modal, ingredientService, Recipe, imgService, UserSession) {
        //global variables
        angular.extend(this, $controller('baseRecipeController', { $scope: $scope }));

        init();
        function init() {
            $scope.recipe = recipeService.create();
            $scope.units = recipeService.getUnits();
        }
    });


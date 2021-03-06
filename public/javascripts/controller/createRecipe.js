app.controller('CreateRecipeController',
    function ($controller, $scope, recipeService, $modal, ingredientService
        , Recipe, imgService, UserSession, $location) {
        //global variables
        angular.extend(this, $controller('baseRecipeController', { $scope: $scope }));

        if(!UserSession.isLogged()) $location.path('/login');
        init();
        function init() {
            $scope.recipe = recipeService.create();
            $scope.recipe.image_url = "img/Placeholder-food.jpg";
            $scope.units = recipeService.getUnits();
            initBaseController();
        }

        function initBaseController() {
            $scope.messageConfirmation = "La receta sera guardada, desea continuar?";
            $scope.titleConfirmation = "Crear Receta";
            $scope.action = recipeService.save;
        }

    });


app.controller('RecipeViewController',
    function ($scope, $routeParams, recipeFactory,$controller) {
        angular.extend(this, $controller('baseRecipeController', {$scope: $scope}));
        $scope.recipe = {};
        init();

        function init() {
            var id = $routeParams.id;
            recipeFactory.get({ id: id }, function (recipe) {
                $scope.recipe = recipe;
            });
        }
    });
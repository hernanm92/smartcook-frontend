app.controller('RecipeViewController',
    function ($scope, $routeParams, recipeFactory, $controller) {
        angular.extend(this, $controller('baseRecipeController', { $scope: $scope }));
        $scope.recipe = {};
        $scope.addTip = addTip;
        $scope.addToFavorites = addToFavorites;

        init();

        function addTip() {

        }
        
        function addToFavorites() {

        }
        

        function init() {
            var id = $routeParams.id;
            recipeFactory.get({ id: id }, function (recipe) {
                $scope.recipe = recipe;
            });
        }
    });
app.controller('TopQualifiedController',
    function ($scope, recipeFactory, $location) {
        $scope.recipes = recipeFactory.query();
        $scope.getDetailsRecipe = getDetailsRecipe;

        function getDetailsRecipe(id) {
            $location.path('/recipe/' + id + '/detail');
        }
    }
);

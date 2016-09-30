app.controller('FavoritesController',
    function ($scope, recipeFactory, recipePerUserFactory, $location, UserSession) {
        $scope.recipes = [];
        $scope.favoriteRecipes = recipePerUserFactory.query({username: UserSession.getUsername()})
            .$promise.then(function (favorites) {
                for (var i = 0; i < favorites.length; i++)
                    recipeFactory.get({id: favorites[i].recipe_id}).$promise.then(function (recipe) {
                        $scope.recipes.push(recipe);
                    });
            });
        $scope.getDetailsRecipe = getDetailsRecipe;

        function getDetailsRecipe(id) {
            $location.path('/recipe/' + id + '/detail');
        }
    }
);

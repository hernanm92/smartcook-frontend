app.controller('FavoritesController',
    function ($scope, recipeFactory, recipePerUserFactory, $location, UserSession) {
        $scope.recipes = [];
        $scope.removeFromFavorites = removeFromFavorites;
        recipePerUserFactory.query({username: UserSession.getUsername()})
            .$promise.then(function (favorites) {
            $scope.favoriteRecipes = favorites;
            for (var i = 0; i < favorites.length; i++)
                if (favorites[i].favorite)
                    recipeFactory.get({id: favorites[i].recipe_id}).$promise.then(function (recipe) {
                        $scope.recipes.push(recipe);
                    });
        });
        $scope.getDetailsRecipe = getDetailsRecipe;

        function getDetailsRecipe(id) {
            $location.path('/recipe/' + id + '/detail');
        }

        function removeFromFavorites(recipe, $event) {
            var userRecipe = $scope.favoriteRecipes.filter(function (r, i) {
                return r.recipe_id == recipe.id
            })[0];
            userRecipe.favorite = false;
            recipePerUserFactory.update(userRecipe);
            $($event.target).closest('div.row').remove();
        }

    }
);

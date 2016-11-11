app.controller('FavoritesController',
    function ($scope, recipeFactory, recipePerUserFactory, $location, UserSession, RecipeUser) {
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
        //-----------------------Votes
        $scope.isLogged = UserSession.isLogged();
        if (UserSession.isLogged()) {
            if ($scope.userRecipes == undefined)
                RecipeUser.getRecipesOfUser().then(function (userRecipes) {
                    $scope.userRecipes = userRecipes;
                    $scope.userVotedRecipes = RecipeUser.getVotedFromRecipes(userRecipes);
                });
            $scope.userVote = function (recipe) {
                return RecipeUser.userVoteOfRecipe(recipe, $scope.userVotedRecipes);
            }
            $scope.getUserVote = function (recipe) {
                if (angular.isDefined(recipe)) {
                    return RecipeUser.userVoteOfRecipe(recipe, $scope.userVotedRecipes);
                } else {
                }
            }
            $scope.voteRecipe = function (recipe) {
                var voteNumber = $(event.target).closest('ul').find('i.active').length;
                RecipeUser.saveUserVote(recipe, $scope.userVotedRecipes, voteNumber);
            }
        } else {
            $scope.voteRecipe = function (recipe, number) {};
            $scope.isConnected = function () {
                RecipeUser.userNotLoggedIn('Para poder calificar recetas debe tener un usuario. ¿Desea ingresar con uno?', 'Crear Usuario').result.then(function () {
                    window.location.href = "#/login";
                });

            }
        }
        //----------------------------

    }
);

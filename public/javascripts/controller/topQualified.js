app.controller('TopQualifiedController',
    function ($scope, recipeFactory, $location, RecipeUser, UserSession) {
        $scope.recipes = recipeFactory.query();
        $scope.getDetailsRecipe = getDetailsRecipe;

        function getDetailsRecipe(id) {
            $location.path('/recipe/' + id + '/detail');
        }

        //-------------------Favorites
        if (UserSession.isLogged()) {
            RecipeUser.getRecipesOfUser().then(function (userRecipes) {
                $scope.userRecipes = userRecipes;
                $scope.userFavoriteRecipes = RecipeUser.getFavoritesFromRecipes(userRecipes);
            });
            $scope.isFavorite = function (recipe) {
                return RecipeUser.isFavorite(recipe, $scope.userFavoriteRecipes)
            };
            $scope.removeFromFavorites = function (recipe) {
                RecipeUser.removeFromFavorites(recipe, $scope.userRecipes, $scope.userFavoriteRecipes);
            };
            $scope.addToFavorites = function (recipe) {
                RecipeUser.addToFavorites(recipe, $scope.userRecipes, $scope.userFavoriteRecipes);
            };
        } else {
            $scope.addToFavorites = function (recipe) {
                RecipeUser.userNotLoggedIn('Para poder agregar recetas como favoritas debe tener un usuario.¿Desea ingresar con uno?','Crear Usuario').result.then(function () {
                    window.location.href = "#/login";
                });
            };
        }
        //----------------------------
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

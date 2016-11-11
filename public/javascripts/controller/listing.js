app.controller('ListingController',
    function ($scope, UserSession, RecipeUser, $location, recipeService) {
        $scope.$on('$viewContentLoaded', function () {
            App.init();
            App.initScrollBar();
            MouseWheel.initMouseWheel();
            StyleSwitcher.initStyleSwitcher();
        });

        $scope.getDetailsRecipe = function getDetailsRecipe(id) {
            $location.path('/recipe/' + id + '/detail');
        }

        $scope.filteredRecipes = [];

        $scope.searchRecipe = searchRecipe;
        function searchRecipe() {
            var text = $('#searchText').val().trim();
            if (text.trim().length > 2)
                $scope.filteredRecipes = recipeService.getRecipeByName(text);
            else
                $scope.filteredRecipes = [];
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

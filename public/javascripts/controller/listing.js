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
            //TODO: Aca habria que cancelar las requests que haya para que no haga 1000 juntas
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
                RecipeUser.userNotLoggedIn().result.then(function () {
                    window.location.href = "#/login";
                });
            };
        }
        //----------------------------

    }
);

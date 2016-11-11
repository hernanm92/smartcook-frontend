app.controller('TopCategoriesController',
    function ($scope, recipeFactory, $location, UserSession, RecipeUser) {
        $scope.recipes = [];
        $scope.getDetailsRecipe = getDetailsRecipe;
        $scope.clickCategory = clickCategory;
        $scope.hasSelectedCategory = false;

        function getDetailsRecipe(id) {
            $location.path('/recipe/' + id + '/detail');
        }

        function clickCategory($event, restriction) {
            $scope.hasSelectedCategory = true;
            $($event.target).closest('div.row').find('div').removeClass("topCategories-selectedCategory");
            $($event.target).closest('div').addClass("topCategories-selectedCategory");
            var recipesPromise = null;
            switch (restriction) {
                case 'vegan':
                    recipesPromise = recipeFactory.query({'vegan': 'true'}).$promise;
                    break;
                case 'vegetarian':
                    recipesPromise = recipeFactory.query({'vegetarian': 'true'}).$promise;
                    break;
                case 'diabetic':
                    recipesPromise = recipeFactory.query({'diabetic': 'true'}).$promise;
                    break;
                case 'celiac':
                    recipesPromise = recipeFactory.query({'celiac': 'true'}).$promise;
                    break;
            }
            if(recipesPromise != null) recipesPromise.then(function(recipes){ $scope.recipes = recipes; });
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

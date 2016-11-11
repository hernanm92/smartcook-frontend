app.controller('RecipeViewController',
    function ($scope, $routeParams, recipeFactory, ingredientPerRecipeFactory, ingredientFactory,
        blockUI, restrictionsService, UserSession, tipFactory, notifyHelper, RecipeUser) {

        $scope.recipe = {};
        $scope.tips = [];
        $scope.addTip = addTip;
        $scope.ingredients = [];
        $scope.addTip = addTip;
        $scope.cancelTip = cancelTip;
        init();

        function addTip(tipToAdd) {
            //validar q este loguedo
            if (UserSession.isLogged()) {
                var tip = {
                    username: UserSession.getUsername(),
                    recipe_id: $scope.recipe.id,
                    description: tipToAdd
                }
                $scope.tips.push(tip);
                tipFactory.save(tip);
            }
            else {
                notifyHelper.warn('Para ayudar necesitas ser un smartcook!!!');
            }
        }

        function getTips() {
            tipFactory.query({ recipe_id: $scope.recipe.id }, function (tips) {
                $scope.tips = tips;
            })
        }

        function init() {
            blockUI.start();
            var id = $routeParams.id;
            //recipe
            recipeFactory.get({ id: id }, function (recipe) {
                //ingsPerRecipe
                ingredientFactory.query({ recipe_id: id }, function (ingsFromRecipe) {
                    validateIngsPerRecipe(ingsFromRecipe);
                    angular.forEach(ingsFromRecipe, function (ingFromRecipe) {
                        //ingAmounts
                        ingredientPerRecipeFactory.get({ recipe_id: id, ingredient_id: ingFromRecipe.id }, function (ingAmounts) {
                            var ingView = mapToView(ingFromRecipe, ingAmounts)
                            $scope.recipe = recipe;
                            $scope.ingredients.push(ingView);
                            $scope.restrictions = restrictionsService.mapRestrictions(recipe);
                            getTips()
                            blockUI.stop();
                        })

                    });
                });
            });
        }

        function validateIngsPerRecipe(ingsPerRecipe) {
            if (ingsPerRecipe.length === 0) {
                notifyHelper.warn('No se pudo cargar la receta');
                blockUI.stop();
            }
        }

        function mapToView(ingFromRecipe, ingAmounts) {
            return {
                name: ingFromRecipe.name,
                amount: ingAmounts.amount,
                unit: ingAmounts.unit
            }
        }

        function cancelTip(tipToAdd) {
            delete tipToAdd;
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
    });
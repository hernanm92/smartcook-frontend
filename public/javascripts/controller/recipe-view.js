app.controller('RecipeViewController',
    function ($scope, $routeParams, recipeFactory, ingredientPerRecipeFactory, ingredientFactory,
        blockUI, restrictionsService, UserSession, tipFactory, notifyHelper, RecipeUser) {

        $scope.recipe = {};
        $scope.tips = [];
        $scope.addTip = addTip;
        $scope.ingredients = [];
        $scope.addTip = addTip;
        $scope.cancelTip = cancelTip;
        $scope.tipToAdd = {}
        init();

        function addTip() {
            //validar q este loguedo
            if (UserSession.isLogged()) {
                var tip = {
                    username: UserSession.getUsername(),
                    recipe_id: $scope.recipe.id,
                    description: $scope.tipToAdd.description
                }
                tipFactory.save(tip, function (res) {
                    $scope.tips.push(tip);
                    $scope.tipToAdd.description = '';
                });
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

        function removeTagsCross() {
            $('div.host a.remove-button').remove();
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
                            $scope.recipe = recipe; //TODO: esto tiene que estar arriba, no tiene que depender del tiempo
                            $scope.ingredients.push(ingView);
                            $scope.restrictions = restrictionsService.mapRestrictions(recipe); //TODO: esto tiene que estar arriba, no tiene que depender del tiempo
                            getTips();
                            $('div.host a.remove-button').remove(); //saco las X de los tags
                            setTimeout(removeTagsCross, 1000)
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

        function cancelTip() {
            $scope.tipToAdd.description = '';
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
                RecipeUser.userNotLoggedIn('Para poder agregar recetas como favoritas debe tener un usuario.¿Desea ingresar con uno?', 'Crear Usuario').result.then(function () {
                    window.location.href = "#/login";
                });
            };
        }
        //----------------------------
    });

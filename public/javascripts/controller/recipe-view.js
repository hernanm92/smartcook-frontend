app.controller('RecipeViewController',
    function ($scope, $routeParams, recipeFactory, ingredientPerRecipeFactory, ingredientFactory,
        blockUI, restrictionsService, UserSession, tipFactory, notifyHelper) {

        $scope.recipe = {};
        $scope.tips = [];
        $scope.addTip = addTip;
        $scope.addToFavorites = addToFavorites;
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


        function addToFavorites() {
            //sacar codigo de agus
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
    });
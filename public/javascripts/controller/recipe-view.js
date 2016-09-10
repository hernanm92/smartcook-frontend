app.controller('RecipeViewController',
    function ($scope, $routeParams, recipeFactory, ingredientPerRecipeFactory, ingredientFactory, blockUI, restrictionsService) {

        $scope.recipe = {};
        $scope.addTip = addTip;
        $scope.addToFavorites = addToFavorites;
        $scope.ingredients = [];
        init();

        function addTip() {

        }

        function addToFavorites() {

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
    });
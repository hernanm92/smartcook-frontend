app.controller('RecipeViewController',
    function ($scope, $routeParams, recipeFactory, ingredientPerRecipeFactory) {
        
        $scope.recipe = {};
        $scope.addTip = addTip;
        $scope.addToFavorites = addToFavorites;

        init();

        function addTip() {

        }
        
        function addToFavorites() {

        }
        
        function init() {
            var id = $routeParams.id;
            recipeFactory.get({ id: id }, function (recipe) {
                $scope.recipe = recipe;
            });

            ingredientPerRecipeFactory.query({recipe_id:id},function(ings){
                $scope.ingredients = ings;
            });
        }
    });
app.controller('ValidateController',
    function ($scope, recipeFactory, eventService) {
        $scope.validateRecipeIndex = 0;
        $scope.validateCurrentRecipe = {};

        function getRecipes(){
            recipeFactory.query({},function(recipes){
                $scope.recipes=recipes;
                $scope.validateCurrentRecipe = recipes[0];
            });
        };

        getRecipes();

        function setNextRecipe(){
            if($scope.validateRecipeIndex < ($scope.recipes.length - 1)){
                $scope.validateRecipeIndex++;
                $scope.validateCurrentRecipe = $scope.recipes[$scope.validateRecipeIndex];
            }
        }

        $scope.nextRecipe = function(){
            $('.validateRecipe-Recipe').animate({opacity: 0}, 500,function(){
                setNextRecipe();
                $('.validateRecipe-Recipe').animate({opacity: 1}, 500);
            });
        };
    }
);

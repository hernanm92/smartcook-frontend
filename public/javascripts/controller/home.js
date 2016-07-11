app.controller('HomeController',
    function ($scope, ingredientFactory, recipeFactory) {
        
        $scope.getIngredients = getIngredients;
        $scope.getRecipes = getRecipes;
        $scope.init = init;
        $scope.$on('$viewContentLoaded', function(){
            App.init();
            App.initScrollBar();
            App.initParallaxBg();
            //OwlCarousel.initOwlCarousel();
            RevolutionSlider.initRSfullWidth();
            StyleSwitcher.initStyleSwitcher();
        });

        $scope.init();

        function init (){
            $scope.getIngredients();
            $scope.getRecipes();
        }

        function getIngredients (){
            ingredientFactory.query({},function(ingredients){
                $scope.ingredients=ingredients;
            });
        };

        function getRecipes (){
            recipeFactory.query({},function(recipes){
                $scope.recipes=recipes;
            });
        };
    }
);

//forma que encontre para que ejecute este jquery cuando terminan de cargarse todas las fotos,
//se podria probar con $q.
app.directive('onFinishIngredientsRender', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                element.ready(function () {
                    OwlCarousel.initOwlCarousel();
                });
            }
        }
    }
});

app.controller('HomeController',
    function ($scope, ingredientFactory, recipeFactory, eventService) {

        $scope.$on('$viewContentLoaded', function(){
            App.init();
            App.initScrollBar();
            App.initParallaxBg();
            //OwlCarousel.initOwlCarousel();
            RevolutionSlider.initRSfullWidth();
            StyleSwitcher.initStyleSwitcher();
        });

        $scope.getIngredients = function(){
            ingredientFactory.query({},function(ingredients){
                $scope.ingredients=ingredients;
            });
        };

        $scope.getIngredients();

        $scope.getRecipes = function(){
            recipeFactory.query({},function(recipes){
                $scope.recipes=recipes;
            });
        };

        $scope.getRecipes();

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

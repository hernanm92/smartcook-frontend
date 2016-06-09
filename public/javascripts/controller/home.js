app.controller('HomeController',
    function ($scope, ingredientFactory, eventService) {

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
                console.log($scope.ingredients)
            });
        };

        $scope.getIngredients();

    }
);

//forma que encontre para que ejecute este jquery cuando terminan de cargarse todas las fotos
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

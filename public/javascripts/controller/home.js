app.controller('HomeController',
    function ($scope, ingredientFactory, eventService) {

        $scope.$on('$viewContentLoaded', function(){
            App.init();
            App.initScrollBar();
            App.initParallaxBg();
            OwlCarousel.initOwlCarousel();
            RevolutionSlider.initRSfullWidth();
            StyleSwitcher.initStyleSwitcher();
        });

        $scope.getIngredients = function(){
            ingredientFactory.query({},function(ingredients){
                $scope.ingredients=ingredients;
            });
        };

        $scope.getIngredients();

    }
);

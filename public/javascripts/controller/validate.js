app.controller('ValidateController',
    function ($scope, recipeFactory, eventService) {
        $scope.$on('$viewContentLoaded', function(){
            App.init();
            App.initScrollBar();
            MouseWheel.initMouseWheel();
            StyleSwitcher.initStyleSwitcher();
            RevolutionSlider.initRSfullWidth();
        });

        $scope.getRecipes = function(){
            recipeFactory.query({},function(recipes){
                $scope.recipes=recipes;
            });
        };

        $scope.getRecipes();
    }
);

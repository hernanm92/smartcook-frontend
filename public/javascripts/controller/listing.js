app.controller('ListingController',
    function ($scope, recipeFactory) {
        $scope.$on('$viewContentLoaded', function(){
            App.init();
            App.initScrollBar();
            MouseWheel.initMouseWheel();
            StyleSwitcher.initStyleSwitcher();
        });

        $scope.getRecipes = function(){
            recipeFactory.query({},function(recipes){
                $scope.recipes=recipes;
            });
        };

        $scope.getRecipes();
    }
);

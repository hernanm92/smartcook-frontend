app.controller('TopListingsController',
    function ($scope, ingredientFactory, eventService) {
        $scope.$on('$viewContentLoaded', function(){
            App.init();
            App.initScrollBar();
            MouseWheel.initMouseWheel();
            StyleSwitcher.initStyleSwitcher();
        });
    }
);

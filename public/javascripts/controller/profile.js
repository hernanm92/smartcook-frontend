app.controller('ProfileController',
    function ($scope, ingredientFactory, eventService) {
        $scope.$on('$viewContentLoaded', function(){
            App.init();
			App.initScrollBar();
			OwlCarousel.initOwlCarousel();
			StyleSwitcher.initStyleSwitcher();
			MasterSliderShowcase2.initMasterSliderShowcase2();
        });
    }
);

app.controller('RegisterController',
    function ($scope, ingredientFactory, eventService) {
        $scope.$on('$viewContentLoaded', function(){
            App.init();
			App.initScrollBar();
			Registration.initRegistration();
			StyleSwitcher.initStyleSwitcher();
        });
    }
);

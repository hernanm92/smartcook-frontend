app.controller('LoginController',
    function ($scope, ingredientFactory, eventService) {
        $scope.$on('$viewContentLoaded', function(){
						App.init();
						Login.initLogin();
						App.initScrollBar();
						StyleSwitcher.initStyleSwitcher();
						PageContactForm.initPageContactForm();
        });
    }
);

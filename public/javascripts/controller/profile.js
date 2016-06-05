app.controller('ProfileController',
    function ($scope, ingredientFactory, eventService) {
        $scope.$on('$viewContentLoaded', function(){
            App.init();
            App.initCounter();
            Owl2Carouselv1.initOwl2Carouselv1();
            Owl2Carouselv2.initOwl2Carouselv2();
            Owl2Carouselv3.initOwl2Carouselv3();
            Owl2Carouselv4.initOwl2Carouselv4();
            Owl2Carouselv5.initOwl2Carouselv5();
            ContactForm.initContactForm();
        });
    }
);

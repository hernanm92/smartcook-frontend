app.controller('RegisterController',
    function ($scope, ingredientFactory, eventService) {
        $scope.$on('$viewContentLoaded', function(){
            App.init();
			App.initScrollBar();
			Registration.initRegistration();
			StyleSwitcher.initStyleSwitcher();
        });
        $scope.user = {
            firstName : '',
            lastName : '',
            gender : 'Genero',
            dateOfBirth: '',
            userName : '',
            email : '',
            password : ''
        };
        $scope.myDate = new Date();
        $scope.registerMaxDate = new Date(
              $scope.myDate.getFullYear(),
              $scope.myDate.getMonth(),
              $scope.myDate.getDate()-1);

        $scope.test = function() { console.log($scope.user.gender) };
    }
);

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


//---------------------------------DATE PICKER SECTION---------------------------------
        $scope.today = function() {
            $scope.dt = new Date();
          };
        $scope.today();

        $scope.clear = function() {
            $scope.dt = null;
          };

        $scope.format = 'dd-MMMM-yyyy';

        $scope.popup1 = {
            opened: false
        };

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.myDate = new Date();
        $scope.registerMaxDate = new Date(
                      $scope.myDate.getFullYear(),
                      $scope.myDate.getMonth(),
                      $scope.myDate.getDate()-1);
        $scope.dateOptions = {
            maxDate: $scope.registerMaxDate,
            showWeeks:true,
            startingDay: 1
        };





        $scope.test = function() { console.log($scope.user.gender) };
    }
);

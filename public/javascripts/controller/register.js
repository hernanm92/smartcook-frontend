app.controller('RegisterController',
    function ($scope, ingredientFactory, eventService) {
        $scope.$on('$viewContentLoaded', function () {
            App.init();
            App.initScrollBar();
            Registration.initRegistration();
            StyleSwitcher.initStyleSwitcher();
        });


        $scope.user = {
            firstName: '',
            lastName: '',
            gender: 'Genero',
            dateOfBirth: '',
            userName: '',
            email: '',
            password: ''
        };

        //---------------------------------DATE PICKER SECTION---------------------------------

        function initDatepicker() {
            $scope.dt = new Date();
            $scope.minDate = new Date(1900, 01, 01);
            $scope.myDate = new Date();
            $scope.registerMaxDate = new Date(
                $scope.myDate.getFullYear(),
                $scope.myDate.getMonth(),
                $scope.myDate.getDate() - 1);

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };
        }

        initDatepicker();
        
        $scope.clear = function () {
            $scope.dt = null;
        };

        $scope.format = 'dd-MMMM-yyyy'

        $scope.open1 = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };



        $scope.test = function () { console.log($scope.user.gender) };
    }
);

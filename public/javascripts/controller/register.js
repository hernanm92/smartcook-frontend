app.controller('RegisterController',
    function ($scope, ingredientFactory, eventService, $modal) {
        $scope.$on('$viewContentLoaded', function () {
            App.init();
            App.initScrollBar();
            Registration.initRegistration();
            StyleSwitcher.initStyleSwitcher();
        });
        $scope.validateForm = validateForm;
        $scope.openModal = openModal;
        $scope.genderSelected = genderSelected;
        $scope.openModal = openModal;
        $scope.confirmForm = confirmForm;
        $scope.saveUser = saveUser;

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
            $scope.dt = null;
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

        $scope.openDatepicker = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $('div[ng-switch="datepickerMode"] button:not([disabled="disabled"]) span').css('color','black');
            $scope.opened = true;
        };

        // -----------------------------------------------------------------------------

        function genderSelected(){
            return $('select[name="gender"]').val() != null;
        }

        function validateForm(isValid){
            $scope.submitted = true;

            if(isValid && genderSelected()){
                confirmForm();
                return true;
            }else{
                return false;
            }
        };

        function openModal(message) {
            return $modal.open({
                animation: true,
                templateUrl: '/general/confirmForm',
                controller: 'ModalController',
                size:'sm',
                resolve:{
                    message:function () {
                        return message;
                    }
                },
                windowClass:'menu-bar-space'
            });
        };

        function confirmForm(){
             var message = 'Presione Aceptar para crear el usuario';
             openModal(message).result.then(function(){
                 saveUser();
            });
        };

        function saveUser() {
            alert("LISTO");
//            var recipe = {
//                "userId":1,//se vera de dnd se saca.
//                "name":$scope.nameRecipe,
//                "ingredients":$scope.ingredients,
//                "steps":$scope.steps,
//                "description":$scope.recipeDescription,
//                "photoRecipe" :$scope.photoRecipe
//            };
//            console.log($scope.photoRecipe);
//            $scope.recipe = new recipeFactory();
//            $scope.recipe.data = recipe;
//            recipeFactory.save($scope.recipe,function (res) {
//                openModal('Su receta ha sido guardada exitosamente, entrara al proceso de validacion');
//            });
       };



        $scope.test = function () { console.log($scope.user.gender) };
    }
);

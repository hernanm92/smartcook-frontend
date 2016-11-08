app.controller('RegisterController',
    function ($scope, userFactory, eventService, $modal, UserSession, User, blockUI, query, notifyHelper, NavigationService) {
        $scope.$on('$viewContentLoaded', function () {
            App.init();
            App.initScrollBar();
            Registration.initRegistration();
            StyleSwitcher.initStyleSwitcher();
        });
        var self = this;
        self.users = [];
        $scope.validateForm = validateForm;
        $scope.openModal = openModal;
        $scope.genderSelected = genderSelected;
        $scope.hasErrors = hasErrors;
        $scope.openModal = openModal;
        $scope.confirmForm = confirmForm;
        $scope.saveUser = saveUser;
        $scope.validateUsername = validateUsername;
        $scope.format = 'dd-MMMM-yyyy'

        init();

        function init() {
            blockUI.start();
            $scope.user = {
                firstName: '',
                lastName: '',
                gender: 'Genero',
                dateOfBirth: '',
                userName: '',
                email: '',
                password: ''
            };
            initDatepicker();
            userFactory.query({}, function (users) {
                blockUI.stop();
                self.users = users;
            });
        }


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

        $scope.clear = function () {
            $scope.dt = null;
        };

        function validateUsername() {
            $scope.existusername = query.exists(self.users, 'username', $scope.user.userName);
        }

        $scope.openDatepicker = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };

        // -----------------------------------------------------------------------------

        function genderSelected() {
            return $('select[name="gender"]').val() != null;
        }

        function hasErrors() {
            return $('.state-error').length != "0";
        }

        function validateForm(isValid) {
            $scope.submitted = true;

            if (isValid && genderSelected() && !hasErrors()) {
                saveUser();
                return true;
            } else {
                return false;
            }
        };

        function openModal(message, title) {
            return $modal.open({
                animation: true,
                templateUrl: '/general/confirmForm',
                controller: 'ModalController',
                size: 'sm',
                resolve: {
                    message: function () {
                        return message;
                    },
                    title: function () {
                        return title
                    }
                },
                windowClass: 'menu-bar-space'
            });
        };

        function confirmForm() {
            var message = 'Presione Aceptar para crear el usuario';
            var title = 'Crear Usuario';
            openModal(message, title).result.then(function () {
                saveUser();
            });
        };

        function saveUser() {
            // var user = new User($scope.user.firstName, $scope.user.lastName, $scope.user.gender,
            //     $scope.user.dateOfBirth, $scope.user.userName, $scope.user.email, $scope.user.password);
            blockUI.start();
            var user = {
                username: $scope.user.userName,
                name: $scope.user.firstName.trim() + " " + $scope.user.lastName,
                email: $scope.user.email,
                password: $scope.user.password,
                gender: $scope.user.gender,
                birthdate: $scope.user.dateOfBirth,
                avatar: 'assets/img/newLogo.jpg'
            };

            userFactory.save(user, function (res) {
                blockUI.stop();
                notifyHelper.success('El usuario ha sido creado satisfactoriamente. ¿Desea ingresar con su nuevo Usuario?');
                NavigationService.goToLogin();
            });
        };
    }
);

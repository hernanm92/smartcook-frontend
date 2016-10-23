app.controller('LoginController', LoginController);

function LoginController($scope, UserSession, userLoginFactory,
    $location, facebookService, blockUI, notifyHelper, userFactory,
    userLoginFacebook) {
    
    var self = this;
    $scope.login = login;
    $scope.loginFacebook = loginFacebook;
    $scope.userName = '';
    $scope.user = {};
    $scope.rememberUser = true;
    $scope.$on('$viewContentLoaded', function () {
        App.init();
        Login.initLogin();
        App.initScrollBar();
        StyleSwitcher.initStyleSwitcher();
        PageContactForm.initPageContactForm();
    });

    function login(isValid) {
        $scope.formSubmited = true;
        if (isValid) {
            var user = {
                username: $scope.userName,
                password: $scope.userPass
            }
            userLoginFactory.save(user, function (res) {
                 handleLoginResponse(res);
             });
            $scope.formSubmited = false;
            return;
        }
        $scope.messageLogin = '';
    }

    function handleLoginResponse(res) {
        if (res.token) {
            UserSession.setUser(res.token, res.username, $scope.rememberUser);
            UserSession.initProfileUser($scope.userName);
            $location.path('/');
        } else {
            $scope.messageLogin = "Datos incorrectos. Intente de nuevo";
        }
    }

    /** 1 -> no esta registrado en la app, 0->esta registrado*/
    function loginFacebook() {
        blockUI.start();
        $scope.remember = true;
        facebookService.login().then(function (response) {
            if (response.status === 'connected') {
                facebookService.getUsername()
                    .then(function name(last_name) {
                        setUser(response.authResponse.accessToken,
                            last_name, $scope.remember, response.authResponse.userID);
                        UserSession.initProfileUser('matileon'); //importante    
                        $location.path('/');
                        blockUI.stop();
                    });
            } else {
                notifyHelper.error('No se pudo autenticar, intente de nuevo');
                blockUI.stop();
            }
        });
    }
}

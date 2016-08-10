app.controller('LoginController', LoginController);

function LoginController($scope, UserSession, userLoginFactory, $location, facebookService, blockUI,$http) {

    $scope.login = login;
    $scope.loginFacebook = loginFacebook;
    $scope.username = '';
    $scope.user = {};
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
                username: $scope.username,
                pass: $scope.userPass
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
        if (res.success) {
            setUser(res.token, res.nameUser, $scope.rememberUser);
            $location.path('/');
        } else {
            $scope.messageLogin = "Usuario o contraseña incorrectas. Intente de nuevo";
        }
    }

    function loginFacebook() {
        blockUI.start();
        facebookService.login().then(function (response) {
            if (response.status === 'connected') {
                facebookService.getUsername()
                    .then(function name(last_name) {
                        $scope.user.remember = true;
                        $scope.user.token = response.authResponse.accessToken;
                        $scope.user.username = last_name;
                        UserSession.setUser($scope.user);
                        $location.path('/');
                        blockUI.stop();
                    });
            } else {
                $window.alert('No se pudo loguear');
                blockUI.stop();
            }
        });
    }

    function setUser(token, username, remember) {
        var user = {
            token: token,
            username: username,
            remember: remember
        };
        UserSession.setUser(user);
    }
}

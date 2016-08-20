app.controller('LoginController', LoginController);

function LoginController($scope, UserSession, userLoginFactory,
    $location, facebookService, blockUI, notifyHelper,
    userLoginFacebook) {

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
            setUser(res.token, res.name, $scope.rememberUser, res.id);
            $location.path('/');
        } else {
            $scope.messageLogin = "Usuario o contraseña incorrectas. Intente de nuevo";
        }
    }

    /** 1 -> no esta registrado en la app, 0->esta registrado*/
    function loginFacebook() {
        blockUI.start();
        $scope.remember = true;
        facebookService.login().then(function (response) {

            if (response.status === 'connected') {

                userLoginFacebook.get({ id: response.authResponse.userID }, function (user) {
                    if (user.registered === 1) {
                        //aca crear el perfil o mandarlo a la vista de regster
                        facebookService.getUsername()
                            .then(function name(last_name) {
                                var user = { userID: response.authResponse.userID, name: last_name }
                                userLoginFacebook.save(user, function (userid) {
                                    setUser(response.authResponse.accessToken,
                                        last_name, $scope.remember, userid);
                                    $location.path('/');
                                    blockUI.stop();
                                });
                            });

                    } else {
                        setUser(response.authResponse.accessToken,
                            user.name,
                            $scope.remember,
                            user.id);
                        $location.path('/');
                        blockUI.stop();
                    }
                });
            } else {
                notifyHelper.error('No se pudo autenticar, intente de nuevo');
                blockUI();
            }
        });
    }

    function setUser(token, username, remember, id) {
        var user = {
            token: token,
            username: username,
            remember: remember,
            id: id
        };
        UserSession.setUser(user);
    }
}

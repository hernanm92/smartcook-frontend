app.controller('LoginController', LoginController);

function LoginController($scope, UserSession, userLoginFactory,
    $location, facebookService, blockUI, notifyHelper, userFactory,
    userLoginFacebook) {

    $scope.login = login;
    $scope.loginFacebook = loginFacebook;
    $scope.userName = '';
    $scope.user = {};
    $scope.$on('$viewContentLoaded', function () {
        App.init();
        Login.initLogin();
        App.initScrollBar();
        StyleSwitcher.initStyleSwitcher();
        PageContactForm.initPageContactForm();
    });

    var self = this;
    self.usersAllowed = ['matileon', 'amodugno', 'hmaschwitz'];

    function login(isValid) {
        $scope.formSubmited = true;
        if (isValid) {
            var user = {
                userName: $scope.userName,
                pass: $scope.userPass
            }
            if (self.usersAllowed.indexOf($scope.userName) > -1) {
                setUser('sdasdasdasda', $scope.userName, $scope.rememberUser, null);
                UserSession.initProfileUser($scope.userName);
                $location.path('/');
            } else {
                $scope.messageLogin = "Usuario o contraseña incorrectas. Intente de nuevo";
            }
            /* userLoginFactory.save(user, function (res) {
                 handleLoginResponse(res);
             });*/
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

    function setUser(token, userName, remember, id) {
        var user = {
            token: token,
            userName: userName,
            remember: remember,
            id: id
        };
        UserSession.setUser(user);
    }
}

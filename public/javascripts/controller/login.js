app.controller('LoginController',LoginController);
    
    function LoginController($scope, UserSession, userLoginFactory, $location) {

        $scope.login = login;
        $scope.handleLoginResponse = handleLoginResponse;
        $scope.$on('$viewContentLoaded', function(){
            App.init();
            Login.initLogin();
            App.initScrollBar();
            StyleSwitcher.initStyleSwitcher();
            PageContactForm.initPageContactForm();
        });
        
        function login(isValid) {
            $scope.formSubmited = true;
            if(isValid){
                var user = {
                    username:$scope.username,
                    pass:$scope.userPass
                }
                userLoginFactory.save(user,function (res) {
                    $scope.handleLoginResponse(res);
                });
                $scope.formSubmited = false;
                return;
            }
            $scope.messageLogin = '';
        }

        function handleLoginResponse(res){
            if (res.success) {
                //redirect al inicio y mostrar nombre de usuario.
                UserSession.setUsername(res.nameUser);
                UserSession.setToken(res.token);
                $location.path('/');    
            }else{
                $scope.messageLogin = "Usuario o contraseña incorrectas. Intente de nuevo"
            }
        }
    }

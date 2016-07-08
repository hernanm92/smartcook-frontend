app.controller('LoginController',LoginController);
    
    function LoginController($scope, UserSession, userFactory) {

        $scope.login = login;

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
                    email:$scope.userEmail,
                    pass:$scope.userPass
                }
                userFactory.save(user,function (res) {
                    $scope.messageLogin = res.message; 
                });
                $scope.formSubmited = false;
                return;
            }
            $scope.messageLogin = '';
        }
    }

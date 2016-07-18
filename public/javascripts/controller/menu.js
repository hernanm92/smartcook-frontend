app.controller('MenuController', function ($scope, UserSession,$location) {
     
    $scope.token = token;
    $scope.isNavActive = isNavActive;
    $scope.logOut = logOut;
    $scope.init = init;
    $scope.init();
    
    function init (){
    }

    function isNavActive (id) {
        return $location.path() == id
    };
     
    function token(){
         $scope.username = UserSession.getUsername();
        return UserSession.getToken();
    }

    function logOut(){
        UserSession.deleteUser();
        $location.path('/');
    }
});
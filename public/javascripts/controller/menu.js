app.controller('MenuController', function ($scope, UserSession,$location,$http,itemFactory) {
     
    $scope.token = token;
    $scope.isNavActive = isNavActive;
    $scope.logOut = logOut;
    $scope.getItem = getItem;

    function isNavActive (id) {
        return $location.path() == id
    }
     
    function token(){
         $scope.username = UserSession.getUsername();
        return UserSession.getToken();
    }

    function logOut(){
        UserSession.deleteUser();
        $location.path('/');
    }

    function getItem(text) {
        return itemFactory.query({text:text}).$promise;
    }
});
app.controller('MenuController', function ($scope, UserSession, $location, recipeService) {

    $scope.token = token;
    $scope.isNavActive = isNavActive;
    $scope.logOut = logOut;
    $scope.getRecipes = getRecipes;
    $scope.getDetailRecipe = getDetailRecipe;

    function isNavActive(id) {
        return $location.path() == id
    }

    function token() {
        $scope.username = UserSession.getUsername();
        return UserSession.getToken();
    }

    function logOut() {
        UserSession.deleteUser();
        $location.path('/');
    }

    function getDetailRecipe(id) {
        $location.path('/recipe/' + id + '/detail');
    }

    function getRecipes() {
        return recipeService.getRecipes();
    }
});
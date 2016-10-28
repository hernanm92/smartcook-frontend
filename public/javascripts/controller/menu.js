app.controller('MenuController', function ($scope, UserSession, $location, recipeService, ingredientService) {

    $scope.token = token;
    $scope.isNavActive = isNavActive;
    $scope.logOut = logOut;
    $scope.getRecipes = getRecipes;
    $scope.getDetailRecipe = getDetailRecipe;
    $scope.goToProfile = goToProfile;
    $scope.isAdmin = isAdmin

    function isAdmin() {
        return UserSession.isAdmin();
    }

    function isNavActive(id) {
        return $location.path() == id
    }

    function goToProfile() {
        $location.path('/' + UserSession.getUsername() + '/profile');
    }

    function token() {
        $scope.username = UserSession.getUsername();
        return UserSession.getToken();
    }

    function logOut() {
        UserSession.deleteUser();
        $location.path('/login');
    }

    function getDetailRecipe(id) {
        $location.path('/recipe/' + id + '/detail');
    }

    function getRecipes() {
        return recipeService.getRecipes();
    }
});
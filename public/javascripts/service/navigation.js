angular
    .module('MainApp')
    .service('NavigationService', NavigationService);

    function NavigationService($location) {
        var self = this;
        self.goToHome = goToHome;
        self.goToLogin =  goToLogin;
        self.goToRecipeDetail = goToRecipeDetail;

        function goToHome() {
            $location.path('/home');
        }

        function goToLogin() {
            $location.path('/login');
        }

        function goToRecipeDetail (id) {
            $location.path('/recipe/'+id+'/detail');
        }
    }
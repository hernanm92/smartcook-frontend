var app = angular.module('MainApp', [
    'ngRoute',
    'config',
    'ingredientModule',
    'recipeModule',
    'badgeModule',
    'badgePerUserModule',
    'restrictionModule',
    'categoryModule',
    'userModule',
    'frequentCommensalModule',
    'validateModule',
    'ngTagsInput',
    'ui.bootstrap',
    'monospaced.elastic',
    'flow',
    'ngStorage',
    'ngMessages',
    'itemModule',
    'blockUI',
    'angularSpinner',
    'ngFileUpload',
    'azureBlobUpload',
    'ingredientPerRecipeModule',
    'circle.countdown',
    'foodCategoriesPerUserModule',
    'recipePerUserModule',
    'ingredientPerUserModule',
    'commensalPerUserModule',
    'ngNotify',
    'angular-input-stars'
]);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';
}]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', { templateUrl: 'general/home', controller: 'HomeController' });
    $routeProvider.when('/:username/profile', { templateUrl: 'general/profile', controller: 'ProfileController' });
    $routeProvider.when('/login', { templateUrl: 'general/login', controller: 'LoginController' });
    $routeProvider.when('/register', { templateUrl: 'general/register', controller: 'RegisterController' });
    $routeProvider.when('/listing', { templateUrl: 'general/listing', controller: 'ListingController' });
    $routeProvider.when('/top-listing', { templateUrl: 'general/top-listing', controller: 'TopListingController' });
    $routeProvider.when('/validate', { templateUrl: 'general/validate', controller: 'ValidateController' });
    $routeProvider.when('/Recipe/Create', { 
        templateUrl: 'general/createRecipe',
        controller: 'CreateRecipeController',
        editView: false
     });
    $routeProvider.when('/aboutUs', { templateUrl: 'general/aboutus', controller: 'AboutUsController' });
    $routeProvider.when('/loadIngredient', {
        templateUrl: 'general/loadIngredient',
        controller: 'LoadIngredientController'
    });
    $routeProvider.when('/addCommensal', { templateUrl: 'general/addCommensal', controller: 'AddCommensalController' });
    $routeProvider.when('/topQualified', { templateUrl: 'general/topQualified', controller: 'TopQualifiedController' });
    $routeProvider.when('/topCategories', {
        templateUrl: 'general/topCategories',
        controller: 'TopCategoriesController'
    });
    $routeProvider.when('/favorites', { templateUrl: 'general/favorites', controller: 'FavoritesController' });
    $routeProvider.when('/recipe/:id/detail', {
        templateUrl: 'general/detail-recipe',
        controller: 'RecipeViewController'
    });
    $routeProvider.when('/recipe/:id/edit', {
        templateUrl: 'general/createRecipe',
        controller: 'EditRecipeController',
        editView: true
    });
}]);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptorService');
}]);

app.config(function (blockUIConfig) {
    // Change the default overlay message
    blockUIConfig.message = 'Please stop clicking!';
    blockUIConfig.autoBlock = false;
    blockUIConfig.template = '<div us-spinner style = "width: 100%; height: 100%; opacity: .5; background-color: #fff "></div>'
});

app.config(['usSpinnerConfigProvider', function (usSpinnerConfigProvider) {
    usSpinnerConfigProvider.setDefaults({ position: 'fixed', zIndex: 1, length: 0, opacity: 0 });
}]);

app.config(['flowFactoryProvider', function (flowFactoryProvider) {
    flowFactoryProvider.defaults = {
        target: '/upload',
        permanentErrors: [404, 500, 501],
        testChunks: false
    }
}]);

app.directive('backImg', function () {
    return {
        restrict: 'A',
        scope: {
            image: '=image'
        },
        link: function (scope, element, attrs) {
            scope.$watch('image', function (newImage, oldImage) {
                if(newImage != undefined )
                element.css({
                    'background-image': 'url(' + encodeURI(newImage) + ')',
                    'background-size': 'cover',
                    'background-position': 'center'
                })
            }, true);
        }
    }
});

/*app.run(['$window', 'facebookService', 'UserSession', '$location',
    function ($window, facebookService, UserSession, $location) {

        $window.fbAsyncInit = function () {
            // Executed when the SDK is loaded

            FB.init({
                appId: '1207869632588963',
                version: 'v2.7',
                xfbml: true,
            });

            facebookService.watchAuthenticationStatusChange()
                .then(function (response) {
                    if (response.status === 'connected') {
                    } else if (response.status === 'not_authorized') {
                        $location.path('/');
                        UserSession.deleteUser();
                    } else {
                        $location.path('/');
                        UserSession.deleteUser();
                    }
                })
        };

        (function (d) {
            // load the Facebook javascript SDK

            var js,
                id = 'facebook-jssdk',
                ref = d.getElementsByTagName('script')[0];

            if (d.getElementById(id)) {
                return;
            }

            js = d.createElement('script');
            js.id = id;
            js.async = true;
            js.src = "//connect.facebook.net/en_US/sdk.js";

            ref.parentNode.insertBefore(js, ref);

        }(document));
    }]);*/
var app = angular.module('MainApp', ['ngRoute', 'config', 'ingredientModule', 'recipeModule']);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';
}]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'general/home', controller: 'HomeController'});
    $routeProvider.when('/profile', {templateUrl: 'general/profile', controller: 'ProfileController'});
    $routeProvider.when('/login', {templateUrl: 'general/login', controller: 'LoginController'});
    $routeProvider.when('/register', {templateUrl: 'general/register', controller: 'RegisterController'});
    $routeProvider.when('/listing', {templateUrl: 'general/listing', controller: 'ListingController'});
    $routeProvider.when('/top-listing', {templateUrl: 'general/top-listing', controller: 'TopListingController'});
    $routeProvider.when('/validate', {templateUrl: 'general/validate', controller: 'ValidateController'});
}]);

var app = angular.module('MainApp', [
    'ngRoute',
     'config', 
     'ingredientModule',
      'recipeModule',
      'restrictionModule',
      'categoryModule',
      'userModule',
      'validateModule',
      'ngTagsInput',
      'ui.bootstrap',
      'monospaced.elastic',
      'flow',
      'ngStorage',
      'ngMessages',
      'itemModule',
      'blockUI',
      'angularSpinner'
      ]);

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
    $routeProvider.when('/Recipe/Create', {templateUrl: 'general/createRecipe', controller: 'CreateRecipeController'});
    $routeProvider.when('/recipe/:id/detail',{templateUrl:'general/detail-recipe',controller:'RecipeViewController'});
}]);

app.config(function(blockUIConfig) {
  // Change the default overlay message
  blockUIConfig.message = 'Please stop clicking!';
  blockUIConfig.autoBlock = false;
  blockUIConfig.template = '<div us-spinner style = "width: 100%; height: 100%; opacity: .5; background-color: #fff "></div>'
});

app.config(['usSpinnerConfigProvider', function (usSpinnerConfigProvider) {
    usSpinnerConfigProvider.setDefaults({position:'fixed',zIndex :1, length:0,opacity:0});
}]);

app.run(['$window', 'UserSession',
  function($window, UserSession) {

  $window.fbAsyncInit = function() {
    // Executed when the SDK is loaded

    FB.init({

      /*
       The app id of the web app;
       To register a new app visit Facebook App Dashboard
       ( https://developers.facebook.com/apps/ )
      */

      appId: '279845695721419',

      /*
       Adding a Channel File improves the performance
       of the javascript SDK, by addressing issues
       with cross-domain communication in certain browsers.
      */

      channelUrl: 'general/channel',

      /*
       Set if you want to check the authentication status
       at the start up of the app
      */

      status: true,

      /*
       Enable cookies to allow the server to access
       the session
      */

      version    : 'v2.7'   ,

      /* Parse XFBML */

      xfbml: true
    });

   // UserSession.watchAuthenticationStatusChange();

  };

  (function(d){
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
    js.src = "//connect.facebook.net/en_US/all.js";

    ref.parentNode.insertBefore(js, ref);

  }(document));

}]);
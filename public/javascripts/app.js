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
  $routeProvider.when('/', { templateUrl: 'general/home', controller: 'HomeController' });
  $routeProvider.when('/profile', { templateUrl: 'general/profile', controller: 'ProfileController' });
  $routeProvider.when('/login', { templateUrl: 'general/login', controller: 'LoginController' });
  $routeProvider.when('/register', { templateUrl: 'general/register', controller: 'RegisterController' });
  $routeProvider.when('/listing', { templateUrl: 'general/listing', controller: 'ListingController' });
  $routeProvider.when('/top-listing', { templateUrl: 'general/top-listing', controller: 'TopListingController' });
  $routeProvider.when('/validate', { templateUrl: 'general/validate', controller: 'ValidateController' });
  $routeProvider.when('/Recipe/Create', { templateUrl: 'general/createRecipe', controller: 'CreateRecipeController' });
  $routeProvider.when('/recipe/:id/detail', { templateUrl: 'general/detail-recipe', controller: 'RecipeViewController' });
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

app.run(['$window', 'facebookService','UserSession','$location',
  function ($window, facebookService, UserSession,$location) {

    $window.fbAsyncInit = function () {
      // Executed when the SDK is loaded

      FB.init({
        appId: '279845695721419',
        channelUrl: 'general/channel',
        status: false,
        version: 'v2.7',
        xfbml: true,
        cookie:true
      });

      facebookService.watchAuthenticationStatusChange().then(function (res) {
        if (res.status === 'not_authorized') {
          UserSession.deleteUser();
          $location.path('/');
        }
        if (res.status === 'unknown') {
          UserSession.deleteUser();
          $location.path('/');
        }
      });
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

    } (document));
  }]);
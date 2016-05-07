
var app = angular.module('MainApp', ['ngRoute', 'config', 'applicationModule']);

app.service('selectedParams', function ($location) {
    return {
        getAppName: function () {
            if (!location.hash || location.hash == '#/' || location.hash == '#/application/create' || location.hash == '#/interop_versions') {
                return null;
            } else {
                var re = /\/([^\/]+)\//g;
                var application_name = re.exec(location.hash)[1];
                if (application_name)
                    setCookie("app", application_name);
                else
                    application_name = getCookie('app');

                return application_name;
            }
        },
        getDeploymentId: function () {
            if (location.hash == '#/' || location.hash == '#/application/create') {
                return null;
            } else {
                return $location.search().deployment_id;
            }
        }
    }
});

app.config(['$httpProvider', function ($httpProvider) {
    //Reset headers to avoid OPTIONS request (aka preflight)
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';
}]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'applications/list', controller: 'ApplicationListController'});
}]);


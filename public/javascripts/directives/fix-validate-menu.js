angular
    .module('MainApp')
    .directive('validateMenu', validateMenu);

function validateMenu($window) {
    return {
        link: link,
        restrict: 'EA'
    }

    function link(scope, element, attr) {
        angular.element($window).bind('scroll', function (event) {
            if (50 < event.path[0].pageYOffset) {
                element.addClass(attr.validateMenu);
            } else {
                element.removeClass(attr.validateMenu);
            }
        });
    }
}
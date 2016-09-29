app.controller('comensalsForSearchController',
    function ($scope, frequentsUsers, $modalInstance, userFactory) {

        $scope.users = [];
        init();
        $scope.hoverAddCommensalButton = hoverAddCommensalButton;
        function init() {
            angular.forEach(frequentsUsers, function (frequentUser) {
                userFactory.get({ username: frequentUser.frequent_username }, function (user) {
                    $scope.users.push(user);
                })
            })
        }

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        function hoverAddCommensalButton($event) {
            $($event.currentTarget).toggleClass('fa-star-o').toggleClass('fa-star');
        }
    });
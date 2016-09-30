app.controller('comensalsForSearchController',
    function ($scope, frequentsUsers, $modalInstance, userFactory, homeService, categoriesFactory, 
              notifyHelper, blockUI, $q, mapperService) {

        $scope.users = [];
        init();
        $scope.hoverAddCommensalButton = hoverAddCommensalButton;
        $scope.addCommensalForSearch = addCommensalForSearch;

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

        function addCommensalForSearch(commensal, $event) {
            blockUI.start();
            var promises = {
                profile: userFactory.get({ username: commensal.username }).$promise,
                categoriesUser: categoriesFactory.query({ username: commensal.username }).$promise,
            };
            $q.all(promises).then(function (values) {
                blockUI.stop();
                var commensalProfile = mapperService.mapProfileToModel(values.profile, values.categoriesUser, null);
                homeService.setCommensalProfile(commensalProfile);
                notifyHelper.success('Commensal Agregado');
                commensal.added = true
            });
        }

    });
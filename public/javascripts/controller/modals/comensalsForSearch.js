app.controller('comensalsForSearchController',
    function ($scope, frequentsUsers, $modalInstance, userFactory, homeService, categoriesFactory,
        notifyHelper, blockUI, $q, mapperService) {

        $scope.users = [];
        init();
        $scope.hoverAddCommensalButton = hoverAddCommensalButton;
        $scope.actionCommensal = actionCommensal;

        function init() {
            angular.forEach(frequentsUsers, function (frequentUser) {
                var selected = wasSelected(frequentUser);
                selected.value ? $scope.users.push(selected.user) : $scope.users.push(frequentUser);
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

        function actionCommensal(commensal) {
            commensal.added ? removeCommensalForSearch(commensal) : addCommensalForSearch(commensal);
        }

        function removeCommensalForSearch(commensal) {
            delete commensal.added ;
            homeService.removeCommensalForSearch(commensal.username);
            //delete commensal.added;
            notifyHelper.success('Comensal para busqueda eliminado');
        }

        function addCommensalForSearch(commensal, $event) {
            blockUI.start();
            var promises = {
                profile: userFactory.get({ id: commensal.username }).$promise,
                categoriesUser: categoriesFactory.query({ username: commensal.username }).$promise,
            };
            $q.all(promises).then(function (values) {
                blockUI.stop();
                var commensalProfile = mapperService.mapProfileToModel(values.profile, values.categoriesUser, null);
                homeService.setCommensalProfile(commensalProfile);
                notifyHelper.success('Comensal Agregado para busqueda');
                commensal.added = true;
            });

        }

        function wasSelected(commensal) {
            var commensals = homeService.getCommensalProfile();
            var wasSelected = false;
            var user;
            angular.forEach(commensals, function (comm) {
                if (comm.username === commensal.username) {
                    wasSelected = true;
                    user = comm;
                    user.added = true;
                }
            })
            return { value: wasSelected, user: user };
        }

    });
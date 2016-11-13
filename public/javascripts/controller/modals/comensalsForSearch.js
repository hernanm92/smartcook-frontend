app.controller('comensalsForSearchController',
    function ($scope, frequentsUsers, $modalInstance, userFactory, homeService, categoriesFactory,
        notifyHelper, blockUI, $q, mapperService, ingredientFactory) {

        $scope.users = [];
        $scope.usersSelected = [];
        init();
        $scope.hoverAddCommensalButton = hoverAddCommensalButton;
        $scope.add = add;
        $scope.remove = remove;

        function init() {
            angular.forEach(frequentsUsers, function (frequentUser) {
                var selected = wasSelected(frequentUser);
                selected.value ? $scope.usersSelected.push(selected.user) : $scope.users.push(frequentUser);
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

        function remove(commensal, index) {
            removeUserFrom($scope.usersSelected, index);
            homeService.removeCommensalForSearch(commensal.username);
            $scope.users.push(commensal);
            notifyHelper.success('Comensal eliminado de la búsqueda');
        }

        function add(commensal, index) {
            blockUI.start();
            //Esta logica tienen q estar delagada en service UserSession
            var promises = {
                profile: userFactory.get({ id: commensal.username }).$promise,
                categoriesUser: categoriesFactory.query({ username: commensal.username }).$promise,
                ingredients: ingredientFactory.query({ username: commensal.username }).$promise
            };
            $q.all(promises).then(function (values) {
                blockUI.stop();
                var commensalProfile = mapperService.mapProfileToModel(values.profile, values.categoriesUser, null, values.ingredients);
                homeService.setCommensalProfile(commensalProfile);
                $scope.usersSelected.push(commensal);
                notifyHelper.success('Comensal Agregado para búsqueda');
                removeUserFrom($scope.users, index);
            });
        }

        function removeUserFrom(array, index) {
            array.splice(index, 1);
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
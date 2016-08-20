app.controller('MenuController', function ($scope,
    UserSession, $location, itemFactory, $modal, ingredientFactory, recipeFactory, facebookService) {

    $scope.token = token;
    $scope.isNavActive = isNavActive;
    $scope.logOut = logOut;
    $scope.getItem = getItem;
    $scope.getDetails = getDetails;

    function isNavActive(id) {
        return $location.path() == id
    }

    function token() {
        $scope.username = UserSession.getUsername();
        return UserSession.getToken();
    }

    function logOut() {
        UserSession.deleteUser();
        $location.path('/');
    }

    function getItem(text) {
        return itemFactory.query({ text: text }).$promise;
    }

    //1 -> ingrediente;  0-> receta, esto se debera configurar 
    //como constantes en un app.config
    function getDetails(item) {
        if (item.type === 1) {
            getDetailIng(item.id);
        } else {
            getDeteailRecipe(item.id);
        };
    }

    function openModal(item, template, controller) {
        return $modal.open({
            animation: true,
            templateUrl: template,
            controller: controller,
            size: 'lg',
            resolve: {
                item: function () {
                    return item;
                }
            },
            windowClass: 'menu-bar-space'
        });
    };

    function getDetailIng(id) {
        template = '/general/modals/ingredient';
        controller = 'IngredientModalController';
        ingredientFactory.get({ id: id }, function (ing) {
            openModal(ing, template, controller);
        });
    }

    function getDeteailRecipe(id) {
        $location.path('/recipe/' + id + '/detail');
    }
});
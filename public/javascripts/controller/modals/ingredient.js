app.controller('IngredientModalController',
    function ($scope, item, $modalInstance, categoriesFactory) {
        $scope.ingredient = item;
        $scope.ok = function () {
            $modalInstance.close();
        };
        //aca traer las descripcion de la categoria
        init();

        function init() {
            categoriesFactory.get({id:$scope.ingredient.food_category_id}, function (category) {
                $scope.ingredient.food_category = category.name;  
            })
        }

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
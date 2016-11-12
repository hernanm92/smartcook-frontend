app.controller('LoadIngredientController',
    function ($scope, ingredientFactory, categoriesFactory, $modal, imgService, blockUI, notifyHelper, NavigationService) {

        $scope.validateForm = validateForm;
        $scope.openModal = openModal;
        $scope.getCategoriesBy = getCategoriesBy;
        $scope.isVegetarian = false;
        $scope.isCeliac = false;
        $scope.isVegan = false;
        $scope.isDiabetic = false;
        $scope.selectedCategory = -1;

        init();

        function init() {
            blockUI.start();
            categoriesFactory.query({}, function (categories) {
                blockUI.stop();
                $scope.categories = categories;
            });
        }

        function validateForm(isValid) {
            console.log($scope.fats);
            $scope.submitted = true;
            if (isValid) {
                confirmForm();
            } else {
                $scope.recipeErrorMessage = "Debe completar los datos del ingrediente";
            }
        };

        function openModal(message, title) {
            return $modal.open({
                animation: true,
                templateUrl: '/general/confirmForm',
                controller: 'ModalController',
                size: 'sm',
                resolve: {
                    message: function () {
                        return message;
                    },
                    title: function () {
                        return title;
                    }
                },
                windowClass: 'menu-bar-space'
            });
        };

        function confirmForm() {
            var message = 'El ingrediente será guardado, ¿Desea continuar?';
            var title = 'Guardar Ingrediente';
            openModal(message, title).result.then(function () {
                saveIngredient();
            });
        };

        function saveIngredient() {
            blockUI.start();
            var ingredient = getDataFromView();
            ingredientFactory.save(ingredient, function (res) {
                imgService.uploadImgIngredient($scope.name, $scope.picFile);
                blockUI.stop();
                notifyHelper.success('El ingrediente ha sido guardada exitosamente');
                NavigationService.goToHome();
            });
        }

        function getDataFromView() {
            return {
                name: $scope.name,
                image_url: imgService.getUrlImgIngredient($scope.name),
                food_category_id: $scope.selectedCategory.id,
                vegetarian: $scope.isVegetarian,
                celiac: $scope.isCeliac,
                vegan: $scope.isVegan,
                diabetic: $scope.isDiabetic,
                calories: $scope.calories,
                proteins: $scope.proteins,
                carbohydrates: $scope.carbohydrates,
                fats: $scope.fats,
                name_id: $scope.name.toLowerCase()
            }
        }

        function getCategoriesBy(query) {
            var categories = []
            for (var index = 0; index < $scope.categories.length; index++) {
                var category = $scope.categories[index];
                var queryCase = query.toLowerCase();
                if (category.name.toLowerCase().indexOf(queryCase) > -1) {
                    categories.push(category);
                }
            }
            return categories;
        }

    }
);

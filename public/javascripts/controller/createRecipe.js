app.controller('CreateRecipeController',
    function ($scope, recipeFactory, $modal, ingredientFactory, Recipe, imgService, UserSession, blockUI) {
        //global variables
        $scope.steps = [];
        $scope.ingredients = [];
        $scope.addStep = addStep;
        $scope.loadIngredients = loadIngredients;
        $scope.validateForm = validateForm;
        $scope.deleteStep = deleteStep;
        $scope.openModal = openModal;

        function addStep() {
            $scope.stepErrorMessage = null;
            if ($scope.stepToAdd) {
                var step = {
                    "step": $scope.stepToAdd
                };
                $scope.steps.push(step);
                $scope.stepToAdd = null;
            } else {
                $scope.stepErrorMessage = 'No puede ingresar un paso en blanco';
            }
        };

        function validateForm(isValid) {
            $scope.submitted = true;
            var existSteps = $scope.steps.length > 0;
            var existIngredients = $scope.ingredients.length > 0;
            if (isValid && existSteps && existIngredients) {
                confirmForm();
            } else {
                $scope.recipeErrorMessage = "Debe completar los ingredientes y los pasos";
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
            var message = 'La receta sera guardada, desea continuar?';
            var title = 'Guardar Receta';
            openModal(message, title).result.then(function () {
                saveRecipe();
            });
        };

        function saveRecipe() {
            //refactor: crear un service recipe para la logica de mapeo. en
            //el html se debe tener un objeto recipe q reprensente el recipeViewModel
            blockUI.start();
            var photoName = imgService.getUrlImgRecipe($scope.nameRecipe);
            var recipe = new Recipe(UserSession.getUserId(), $scope.nameRecipe, $scope.ingredients, $scope.steps, $scope.description, photoName);
            recipeFactory.save(recipe, function (res) {
                imgService.uploadImgRecipe($scope.nameRecipe, $scope.picFile);
                openModal('Su receta ha sido guardada exitosamente, entrara al proceso de validacion', 'Receta Guardada');
            });
            blockUI.stop();
        }

        function loadIngredients(text) {
            return ingredientFactory.query({ text: text }).$promise;
        };

        function deleteStep(index) {
            openModal('Desea eliminar este paso?', 'Eliminar Paso').result.then(function () {
                $scope.steps.splice(index, 1);
            });
        };
    });


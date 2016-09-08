app.controller('CreateRecipeController',
    function ($scope, recipeService, $modal, ingredientService, Recipe, imgService, UserSession) {
        //global variables
        $scope.addStep = addStep;
        $scope.loadIngredients = loadIngredients;
        $scope.validateForm = validateForm;
        $scope.deleteStep = deleteStep;
        $scope.openModal = openModal;
        $scope.isIngredientsEmpty = isIngredientsEmpty;
        $scope.units = [];
        
        init();
        function init() {
            $scope.units = recipeService.getUnits();
            $scope.recipe = recipeService.create();
        }

        function isIngredientsEmpty() {
            return $scope.recipe.ingredients.length === 0;
        }

        function addStep() {
            $scope.stepErrorMessage = null;
            if ($scope.stepToAdd ) {
                $scope.recipe.steps.push($scope.stepToAdd);
                $scope.stepToAdd = null;
            } else {
                $scope.stepErrorMessage = 'No puede ingresar un paso en blanco';
            }
        };

        function validateForm(isValid) {
            $scope.submitted = true;
            var existSteps = $scope.recipe.steps.length > 0;
            var existIngredients = $scope.recipe.ingredients.length > 0;
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
                recipeService.save($scope.recipe, $scope.picFile);
            });
        };

        function loadIngredients(query) {
            return ingredientService.getIngredientsBy(query);
        };

        function deleteStep(index) {
            openModal('Desea eliminar este paso?', 'Eliminar Paso').result.then(function () {
                $scope.recipe.steps.splice(index, 1);
            });
        };
    });


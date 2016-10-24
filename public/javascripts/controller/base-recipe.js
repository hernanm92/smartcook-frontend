app.controller('baseRecipeController', function ($scope, recipeService, $modal, ingredientService, Recipe, imgService, UserSession) {

    $scope.addStep = addStep;
    $scope.loadIngredients = loadIngredients;
    $scope.validateForm = validateForm;
    $scope.deleteStep = deleteStep;
    $scope.openModal = openModal;
    $scope.addedPhoto = addedPhoto;
    $scope.isIngredientsEmpty = isIngredientsEmpty;
    $scope.units = [];
    $scope.food = {}

    function addStep() {
        $scope.stepErrorMessage = null;
        if ($scope.stepToAdd) {
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

    function loadIngredients(query) {
        return ingredientService.getIngredientsBy(query);
    };

    function deleteStep(index) {
        openModal('Desea eliminar este paso?', 'Eliminar Paso').result.then(function () {
            $scope.recipe.steps.splice(index, 1);
        });
    };

    function isIngredientsEmpty() {
        return $scope.recipe.ingredients.length === 0;
    }

    function confirmForm() {
        var message = $scope.messageConfirmation;
        var title = $scope.titleConfirmation;
        openModal(message, title).result.then(function () {
            $scope.action($scope.recipe, $scope.food.flow.file);
            //recipeService.save($scope.recipe, $scope.picFile);//esto cambia
        });

    };

    function addedPhoto(flowObject, event, flow) {
        flow.files = []; //borro todo lo anterior. Luego se agrega el file
        $scope.picFile = flowObject.file;
    }
});
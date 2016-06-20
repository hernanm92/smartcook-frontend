app.controller('CreateRecipeController',
    function ($scope, recipeFactory,$modal,ingredientFactory) {
        //global variables
        $scope.steps = [];
        $scope.ingredients = [];
        $scope.addStep = addStep;
        $scope.saveRecipe = saveRecipe;
        $scope.loadIngredients = loadIngredients;
        $scope.confirmForm = confirmForm;
        $scope.validateForm = validateForm;

        function addStep() {
             $scope.stepErrorMessage = null;
            if($scope.stepToAdd){
                var step = {
                    "step" : $scope.stepToAdd
                };
                $scope.steps.push(step);
                $scope.stepToAdd = null;
            }else{
                $scope.stepErrorMessage = 'No puede ingresar un paso en blanco';
            }
        };

        function validateForm(isValid){
            $scope.recipeErrorMessage = null;
            var condition1 = $scope.steps.length>0;
            var condition2 =  $scope.ingredients.length>0;
            if(isValid && condition1 && condition2){
                confirmForm();
            }else{
                $scope.recipeErrorMessage = "Debe completar los ingredientes y los pasos";
            }
        };

        function confirmForm(){
            var confirmation = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/general/confirmForm',
                controller: 'ModalController',
                size:'sm',
                resolve:{
                    message:function () {
                        return 'La receta sera guardada, desaea continuar?';
                    }
                },
                windowClass:'menu-bar-space'
            });

            confirmation.result.then(function(){
                saveRecipe();
            })
        };

        function saveRecipe() {
            var recipe = {
                "name":$scope.nameRecipe,
                "ingredients":$scope.ingredients,
                "steps":$scope.steps
            };
            $scope.recipe = new recipeFactory();
            $scope.recipe.data = recipe;
            recipeFactory.save($scope.recipe,function (res) {

            })
        }

        function loadIngredients(text) {
            //traer ingredientes por texto.Se trndia q validar tambien el perfil
            // del cliente.Ejemplo no puede traer leche si es celiaco. 
          
            return ingredientFactory.query({text:text}).$promise; //traer los ids 
        }
    }
);
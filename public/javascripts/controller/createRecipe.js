app.controller('CreateRecipeController',
    function ($scope, recipeFactory,$modal,ingredientFactory,Recipe) {
        //global variables
        $scope.steps = [];
        $scope.ingredients = [];
        $scope.addStep = addStep;
        $scope.saveRecipe = saveRecipe;
        $scope.loadIngredients = loadIngredients;
        $scope.confirmForm = confirmForm;
        $scope.validateForm = validateForm;
        $scope.deleteStep = deleteStep;
        $scope.openModal = openModal;
        $scope.fileSuccess = fileSuccess;
        $scope.obj = {}; //para usar la foto
        $scope.photoRecipe = {};
           
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
            $scope.submitted = true;
            var existSteps = $scope.steps.length > 0;
            var existIngredients =  $scope.ingredients.length > 0;   
            if(isValid && existSteps && existIngredients){
                confirmForm();
            }else{
                $scope.recipeErrorMessage = "Debe completar los ingredientes y los pasos";
            }
        };

        function openModal(message,title) {
            return $modal.open({
                animation: true,
                templateUrl: '/general/confirmForm',
                controller: 'ModalController',
                size:'sm',
                resolve:{
                    message:function () {
                        return message;
                    },
                    title:function(){
                        return title;
                    }
                },
                windowClass:'menu-bar-space'
            });
        };
            
        function confirmForm(){
             var message = 'La receta sera guardada, desea continuar?';
             var title = 'Guardar Receta';
             openModal(message,title).result.then(function(){
                 saveRecipe();
                });
            };
        
        function saveRecipe() {
            var recipe = {
                "userId":1,//se vera de dnd se saca.
                "name":$scope.nameRecipe,
                "ingredients":$scope.ingredients,
                "steps":$scope.steps,
                "description":$scope.recipeDescription,
                "photoRecipe" :$scope.photoRecipe
            };

            var recipe = new Recipe(1,$scope.nameRecipe,$scope.ingredients,$scope.steps,$scope.recipeDescription,$scope.photoRecipe)
            console.log($scope.photoRecipe);
            $scope.recipe = new recipeFactory();
            $scope.recipe.data = recipe;
            recipeFactory.save($scope.recipe,function (res) {
                openModal('Su receta ha sido guardada exitosamente, entrara al proceso de validacion','Receta Guardada');
            });
       };

        function loadIngredients(text) {
            //traer ingredientes por texto.Se trndia q validar tambien el perfil
            // del cliente.Ejemplo no puede traer leche si es celiaco .

            return ingredientFactory.query({text:text}).$promise; //traer los ids
        };

        function deleteStep(index){
            openModal('Desea eliminar este paso?','Eliminar Paso').result.then(function () {
                $scope.steps.splice(index,1);
            });
        };

        function fileSuccess(msg,file) {
            $scope.photoRecipe = {
                name:file.name,
                id:file.uniqueIdentifier
            };
        };
});


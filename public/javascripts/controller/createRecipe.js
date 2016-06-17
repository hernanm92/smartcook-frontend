app.controller('CreateRecipeController',
    function ($scope,recipeFactory) {
        //global variables
        $scope.steps = [];
        $scope.ingredients = [];
        $scope.addStep = addStep;
        $scope.saveRecipe = saveRecipe;
        
        function addStep() {
            var step = {
                'step' : $scope.stepToAdd
            }
            $scope.steps.push(step);
            $scope.stepToAdd = '';
        }

        function saveRecipe() {
            var recipe = {
                "name":$scope.nameRecipe,
                "ingredients":$scope.ingredients,
                "steps":$scope.steps
            }

            $scope.recipe = new recipeFactory();
            $scope.recipe.data = recipe;
            recipeFactory.save($scope.recipe,function (res) {
                console.log(res);
            })
        };
    }
);
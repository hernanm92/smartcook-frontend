app.controller('ValidateController',
    function ($scope, recipeFactory, validateFactory, eventService, $timeout) {
        $scope.validateRecipeIndex = 0;
        $scope.validateCurrentRecipe = {};
        $("body").keypress(function(e){
           if(e.which == '108') $scope.nextRecipe(1);
           if(e.which == '100') $scope.nextRecipe(0);
        });

        function getRecipes(){
            recipeFactory.query({},function(recipes){
                $scope.recipes=recipes;
                $scope.validateCurrentRecipe = recipes[0];
            });
        };

        function setNextRecipe(){
            if($scope.validateRecipeIndex < ($scope.recipes.length - 1)){
                $scope.validateRecipeIndex++;
                $scope.validateCurrentRecipe = $scope.recipes[$scope.validateRecipeIndex];
            }
        }

        getRecipes();

        $scope.runBootstro = function(){
            bootstro.start('.bootstro',{
                nextButtonText: 'Siguiente »',
                prevButtonText: '« Anterior',
                finishButtonText: 'Finalizar DEMO'
            });
        };

        $scope.nextRecipe = function(validation){
            $('.validateRecipe-Recipe').animate({opacity: 0}, 500,function(){
                var validatedRecipe = {
                    "userId":1, //TODO: De donde se saca?
                    "recipeId": $scope.validateCurrentRecipe.id,
                    "validation": validation
                };
                $scope.validate = new validateFactory();
                    $scope.validate.data = validatedRecipe;
                    validateFactory.save($scope.validate,function (response) {
                        $.notify("Receta Validada",{globalPosition:'right bottom',className:'success'});
                });
                //TODO: Si es la ultima, no mostrar mas
                $timeout(function(){
                    setNextRecipe();
                    $('.validateRecipe-Recipe').animate({opacity: 1}, 500);
                }
                ,1000);
            });
        };
    }
);

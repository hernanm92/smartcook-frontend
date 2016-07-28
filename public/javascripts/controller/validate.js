app.controller('ValidateController',
    function ($scope, recipeFactory, eventService) {
        $scope.validateRecipeIndex = 0;
        $scope.validateCurrentRecipe = {};

        function likeAndDislikeKeyCatch(){
            $("body").keypress(function(e){
               if(e.which == '108' || e.which == '100') $scope.nextRecipe();
            });
        }

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

        $scope.runBootstro = function(){
            bootstro.start('.bootstro',{
                nextButtonText: 'Siguiente »',
                prevButtonText: '« Anterior',
                finishButtonText: 'Finalizar DEMO'
            });
        };

        getRecipes();
        likeAndDislikeKeyCatch();

        $scope.nextRecipe = function(){
            $('.validateRecipe-Recipe').animate({opacity: 0}, 500,function(){
                setTimeout(function(){
                    setNextRecipe();
                    $('.validateRecipe-Recipe').animate({opacity: 1}, 500);
                }
                ,1000);
            });
        };
    }
);

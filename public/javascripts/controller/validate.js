app.controller('ValidateController',
    function ($scope, recipeFactory, validateFactory, eventService, $timeout) {
        $scope.validateRecipeIndex = 0;
        $scope.validateCurrentRecipe = {};
        $scope.recipes = [];
        $("body").keypress(function (e) {
            if (e.which == '108') $scope.nextRecipe(1);
            if (e.which == '100') $scope.nextRecipe(0);
        });

        init();
        function init() {
            recipeFactory.query({}, function (recipes) {
                $scope.recipes = recipes;
                $scope.validateCurrentRecipe = $scope.recipes[0];
            });
        }

        function setNextRecipe() {
            if ($scope.validateRecipeIndex < ($scope.recipes.length - 1)) {
                $scope.validateRecipeIndex++;
                $scope.validateCurrentRecipe = $scope.recipes[$scope.validateRecipeIndex];
            } else {
                $('.validateRecipe-Recipe').css('visibility', 'hidden');
                $.notify("No hay mas recetas para validarr", { globalPosition: 'right bottom', className: 'info' });
            }
        }

        $scope.runBootstro = function () {
            bootstro.start('.bootstro', {
                nextButtonText: 'Siguiente »',
                prevButtonText: '« Anterior',
                finishButtonText: 'Finalizar DEMO'
            });
        };

        $scope.nextRecipe = function (validation) {
            if ($('.validateRecipe-Recipe').css('visibility') != "hidden") {
                $('.validateRecipe-Recipe').animate({ opacity: 0 }, 500, function () {
                    var validatedRecipe = {
                        "userId": 1, //TODO: De donde se saca?
                        "recipeId": $scope.validateCurrentRecipe.id,
                        "validation": validation
                    };
                    validateFactory.save(validatedRecipe, function (response) {
                        $.notify("Receta Validada", { globalPosition: 'right bottom', className: 'success' });
                    });
                    $timeout(function () {
                        setNextRecipe();
                        $('.validateRecipe-Recipe').animate({ opacity: 1 }, 500);
                    }
                        , 1000);
                });
            }
            else $.notify("No hay mas recetas para validar", { globalPosition: 'right bottom', className: 'info' });
        };

    }
);

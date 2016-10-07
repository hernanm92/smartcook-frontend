app.controller('ValidateController',
    function ($scope, recipeFactory, validateFactory, eventService, $timeout, $location, UserSession) {
        if(!UserSession.isLogged()) $location.path('/login');
        $scope.validateRecipeIndex = 0;
        $scope.validateCurrentRecipe = {};
        $scope.recipes = [];
        $scope.skip = skip;
        $scope.nextRecipe = nextRecipe;

        $("body").keypress(function (e) {
            if (e.which == '108') $scope.nextRecipe(1);
            if (e.which == '100') $scope.nextRecipe(0);
        });

        init();
        function init() {
            recipeFactory.query({}, function (recipes) {
                $scope.recipes = recipes;
                var id = $scope.recipes.pop().id;
                recipeService.getDetailRecipe(id).then(function (value) {

                    $scope.validateCurrentRecipe = value;
                });
            });
        }

        function skip() {
            $('.validateRecipe-Recipe').animate({ opacity: 0 }, 500, function () {});
            setNextRecipe();
        }

        function setNextRecipe() {
            if ($scope.recipes.length > 0) {
                var id = $scope.recipes.pop().id;
                //aca traer la info getDetail
                recipeService.getDetailRecipe(id).then(function (value) {
                    $scope.validateCurrentRecipe = value;
                    $('.validateRecipe-Recipe').animate({ opacity: 1 }, 500);
                });
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

        function nextRecipe(validation) {
            $('.validateRecipe-Recipe').animate({ opacity: 0 }, 500, function () {});
                var validatedRecipe = {
                    "userId": 1, //TODO: De donde se saca?
                    "recipeId": $scope.validateCurrentRecipe.id,
                    "validation": validation
                };
                //Integrar con la api cuando este disponible
                /*validateFactory.save(validatedRecipe, function (response) {
                    $.notify("Receta Validada", { globalPosition: 'right bottom', className: 'success' });
                });*/
                setNextRecipe();
        }
    }
);

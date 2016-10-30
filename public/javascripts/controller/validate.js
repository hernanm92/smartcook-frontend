app.controller('ValidateController',
    function ($scope, recipeFactory, validateFactory, eventService, $timeout, recipeService
        , UserSession, $q, recipePerUserFactory, $location, blockUI) {
        if (!UserSession.isLogged()) $location.path('/login');
        $scope.validateRecipeIndex = 0;
        $scope.validateCurrentRecipe = {};
        $scope.skip = skip;
        $scope.nextRecipe = nextRecipe;
        $scope.recipesPerUser = [];

        init();
        function init() {
            blockUI.start();
            validateFactory.query({username: UserSession.getUsername()}, function (recipes) {
                $scope.recipes = recipes;
                blockUI.stop();
                if (recipes.length > 0) {
                    var id = $scope.recipes.pop().id;
                    recipeService.getDetailRecipe(id).then(function (value) {
                        $scope.validateCurrentRecipe = value;
                    });
                } else {
                    $scope.noRecipesToValidate = true;
                }
            });
        }

        function skip(recipeId) {
            var params = {
                username: UserSession.getUsername(),
                recipe_id: $scope.validateCurrentRecipe.id,
                validated: true,
                owner: false,
                favorite: false,
                positive_validation: null
            }
            $scope.recipesPerUser.push(params);
            recipePerUserFactory.save(params, function (res) {
                handleResponse();
            });
        }

        function setNextRecipe() {
            if ($scope.recipes.length > 0) {
                var id = $scope.recipes.pop().id;
                recipeService.getDetailRecipe(id).then(function (value) {
                    $scope.validateCurrentRecipe = value;
                    $('.validateRecipe-Recipe').animate({ opacity: 1 }, 500);
                });
            } else {
                $scope.noRecipesToValidate = true;
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
            $('.validateRecipe-Recipe').animate({ opacity: 0 }, 500, function () { });
            //updetear o guardar el campo 'positive vote'
            var recipeId = $scope.validateCurrentRecipe.id;
            saveRelation(recipeId, validation);
        }

        function saveRelation(recipeId, validation) {
            var params = {
                username: UserSession.getUsername(),
                recipe_id: recipeId,
                validated: true,
                owner: false,
                favorite: false,
                positive_validation: validation
            }
            $scope.recipesPerUser.push(params);
            recipePerUserFactory.save(params, function (res) {
                handleResponse();
            });
        }

        function handleResponse() {
            //$.notify("Receta Validada", { globalPosition: 'right bottom', className: 'success' });
            setNextRecipe();
        }
    }
);

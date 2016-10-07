app.controller('ValidateController',
    function ($scope, recipeFactory, validateFactory, eventService, $timeout, recipeService, UserSession, $q, recipePerUserFactory) {
        $scope.validateRecipeIndex = 0;
        $scope.validateCurrentRecipe = {};
        $scope.skip = skip;
        $scope.nextRecipe = nextRecipe;

        $("body").keypress(function (e) {
            if (e.which == '108') $scope.nextRecipe(1);
            if (e.which == '100') $scope.nextRecipe(0);
        });

        init();
        function init() {
            var userWithFalseRelation = {
                username: UserSession.getUsername(),
                validated: false
            }
            recipeFactory.query(userWithFalseRelation, function (recipes) {
                $scope.recipes = recipes;
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

        function skip() {
            $('.validateRecipe-Recipe').animate({ opacity: 0 }, 500, function () { });
            setNextRecipe();
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
            recipePerUserFactory.query({ username: UserSession.getUsername(), recipe_id: recipeId }, function (res) {
                res.length === 0 ? saveRelation() : updateRelation()
            });
        }

        function saveRelation() {
            var params = {
                username: UserSession.getUsername(),
                recipe_id: $scope.validateCurrentRecipe.id,
                validated: true,
                owner: false,
                favorite: false
            }
            recipePerUserFactory.save(params, function (res) {
                handleResponse();
            });
        }

        function handleResponse() {
            //$.notify("Receta Validada", { globalPosition: 'right bottom', className: 'success' });
            setNextRecipe();
        }

        function updateRelation() {
            var params = {
                username: UserSession.getUsername(),
                recipe_id: $scope.validateCurrentRecipe.id,
                validated: true
            }
            recipePerUserFactory.update(params, function (res) {
                handleResponse();
            });
        }
    }
);

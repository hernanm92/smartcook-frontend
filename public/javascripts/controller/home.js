app.controller('HomeController',
    function ($scope, ingredientFactory,
        recipeFactory, homeHelper, $location,
        notifyHelper, blockUI, UserSession,searcher) {

        //private    
        var self = this;
        self.ingsToSend = [];

        //set Values
        $scope.ingredients = [];
        $scope.advancedSettings = false;

        //functions
        $scope.isEmpty = isEmpty;
        $scope.getIngredients = getIngredients;
        $scope.removeIngredient = removeIngredient;
        $scope.updateIngredientToFull = updateIngredientToFull;
        $scope.getDetailIng = getDetailIng;
        $scope.getDetailsRecipe = getDetailsRecipe;
        $scope.search = search;
        $scope.removeIngredients = removeIngredients;
        $scope.advancedSearch = advancedSearch;
        $scope.isLogged = isLogged;
        $scope.resetSearch = resetSearch;

        $scope.$on('$viewContentLoaded', function () {
            App.init();
            App.initScrollBar();
            App.initParallaxBg();
            RevolutionSlider.initRSfullWidth();
            StyleSwitcher.initStyleSwitcher();
        });

        init();

        function init() {
            $scope.ingredients = homeHelper.initIngredients();
            $scope.recipes = searcher.getRecipes();
            $scope.omitRestrictions = true;
            $scope.omitDislikeIngs = true;
            $scope.omitCategories = true;
        };

        function updateIngredientToFull(ingSelected, ingFromTemplate) {
            ingFromTemplate.name = ingSelected.name;
            ingFromTemplate.image = ingSelected.image_url;
            ingFromTemplate.templateType = 'full';
            ingFromTemplate.id = ingSelected.id;
            ingFromTemplate.category = ingSelected.category;
        }

        function updateIngredientToEmpty(ingFromTemplate) {
            ingFromTemplate.name = '';
            ingFromTemplate.image = 'assets/img/blog/09.jpg';
            ingFromTemplate.templateType = 'empty';
            ingFromTemplate.id = null;
            ingFromTemplate.category = null;
        }

        function removeIngredient(ingFromTemplate) {
            updateIngredientToEmpty(ingFromTemplate);
        }

        function isEmpty(ingredient) {
            return homeHelper.isEmpty(ingredient);
        }

        function getIngredients(text) {
            //getProfileRestriccions() para usar sus preferencias si esta logueado
            return ingredientFactory.query({ text: text }).$promise;
        }

        function getDetailIng(id) {
            template = '/general/modals/ingredient';
            controller = 'IngredientModalController';
            ingredientFactory.get({ id: id }, function (ing) {
                homeHelper.openModal(ing, template, controller);
            });
        }

        function getDetailsRecipe(id) {
            recipeFactory.get({ id: id }, function (recipe) {
                 $location.path('/recipe/' + id + '/detail');
            });
        }

        function search() {
            var ingsToSend = homeHelper.getIngsWithData($scope.ingredients); 
            if (ingsToSend.length < 1) {
                notifyHelper.warn('Debes seleccionar al menos un ingrediente');
            } else {
                $scope.recipes = searcher.getRecipesBy(ingsToSend);
            }
        }

        function removeIngredients() {
            angular.forEach($scope.ingredients, function (ing) {
                $scope.removeIngredient(ing);
            })
        }

        function advancedSearch() {
            $scope.advancedSettings = !$scope.advancedSettings;
        }

        function isLogged() {
            return UserSession.getToken();
        }

        function resetSearch() {
            $scope.recipes = [];
            searcher.resetRecipes();
        }
    }
);

//forma que encontre para que ejecute este jquery cuando terminan de cargarse todas las fotos,
app.directive('onFinishIngredientsRender', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                element.ready(function () {
                    OwlCarousel.initOwlCarousel();
                });
            }
        }
    }
});

app.controller('HomeController',
    function ($scope, ingredientFactory,
        recipeFactory, homeHelper, $location,
        notifyHelper, blockUI) {

        //private    
        var self = this;
        self.ingsToSend = [];
        self.getRecipes = getRecipes;

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
        };

        function updateIngredientToFull(ing, index) {
            $scope.ingredients[index].name = ing.name;
            $scope.ingredients[index].image = ing.image_url;
            $scope.ingredients[index].templateType = 'full';
            $scope.ingredients[index].id = ing.id;
            $scope.ingredients[index].category = ing.category;
            self.ingsToSend.push($scope.ingredients[index]);

        }

        function updateIngredientToEmpty(index) {
            $scope.ingredients[index].name = '';
            $scope.ingredients[index].image = 'assets/img/blog/09.jpg';
            $scope.ingredients[index].templateType = 'empty';
            $scope.ingredients[index].id = null;
            $scope.ingredients[index].category = null;
        }

        function removeIngredient(indexTemplate) {
            var idIng = $scope.ingredients[indexTemplate].id;
            updateIngredientToEmpty(indexTemplate);
            var index = homeHelper.getIndexElemFrom(idIng, self.ingsToSend);
            self.ingsToSend.splice(index, 1);
        }

        function isEmpty(ingredient) {
            return ingredient.templateType === 'empty';
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
            template = '/general/modals/recipe';
            controller = 'RecipeModalController';
            recipeFactory.get({ id: id }, function (recipe) {
                homeHelper.openModal(recipe, template, controller);
            });
        }

        function search() {
            if (self.ingsToSend.length < 1) {
                notifyHelper.warn('Debes seleccionar al menos un ingrediente');
            } else {
                self.getRecipes();
            }
        }

        function getRecipes() {
            blockUI.start();
            recipeFactory.query({ object: self.ingsToSend }, function (recipes) {
                $scope.recipes = recipes;
                blockUI.stop();
            });
        }

        function removeIngredients() {
            for (var ing = 0; ing < $scope.ingredients.length; ing++) {
                removeIngredient(ing);
            }
            self.ingsToSend = [];
        }

        function advancedSearch() {
            $scope.advancedSettings = !$scope.advancedSettings
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

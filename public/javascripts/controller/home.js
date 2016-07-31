app.controller('HomeController',
    function ($scope, ingredientFactory, recipeFactory, homeHelper) {

        $scope.getIngredients = getIngredients;
        $scope.getRecipes = getRecipes;
        $scope.ingredients = [];
        $scope.isEmpty = isEmpty;
        $scope.removeIngredient = removeIngredient;
        $scope.updateIngredientToFull = updateIngredientToFull;
        $scope.$on('$viewContentLoaded', function () {
            App.init();
            App.initScrollBar();
            App.initParallaxBg();
            RevolutionSlider.initRSfullWidth();
            StyleSwitcher.initStyleSwitcher();
        });

        init();

        function updateIngredientToFull(ing, index) {
            $scope.ingredients[index].name = ing.name;
            $scope.ingredients[index].image = ing.image_url;
            $scope.ingredients[index].templateType = 'full';
            $scope.ingredients[index].id = ing.id;
            $scope.ingredients[index].category = ing.category;
        }

        function updateIngredientToEmpty(index) {
            $scope.ingredients[index].name = '';
            $scope.ingredients[index].image = 'assets/img/blog/09.jpg';
            $scope.ingredients[index].templateType = 'empty';
            $scope.ingredients[index].id = null;
            $scope.ingredients[index].category = null;
        }

        function removeIngredient(index) {
            updateIngredientToEmpty(index);
        }

        function isEmpty(ingredient) {
            return ingredient.templateType === 'empty';
        }

        function init() {
            $scope.ingredients = homeHelper.initIngredients();
            $scope.getRecipes();
        };

        function getIngredients(text) {
            //getProfileRestriccions() para usar sus preferencias si esta logueado
            return ingredientFactory.query({ text: text }).$promise;
        };

        function getRecipes() {
            recipeFactory.query({}, function (recipes) {
                $scope.recipes = recipes;
            });
        };
    }
);

//forma que encontre para que ejecute este jquery cuando terminan de cargarse todas las fotos,
//se podria probar con $q.
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

app.controller('HomeController',
    function ($scope, ingredientService,
        recipeFactory, homeService, $location,
        notifyHelper, blockUI, UserSession) {

        //private    
        var self = this;
        self.ingsToSend = [];
        
        //set Values
        $scope.ingredientsTemplate = [];
        $scope.advancedSettings = false;

        //functions
        $scope.isEmpty = isEmpty;
        $scope.updateIngredientToFull = updateIngredientToFull;
        $scope.getDetailIng = getDetailIng;
        $scope.getDetailsRecipe = getDetailsRecipe;
        $scope.search = search;
        $scope.removeIngredient = removeIngredient;
        $scope.removeIngredients = removeIngredients;
        $scope.isLogged = isLogged;
        $scope.resetSearch = resetSearch;
        $scope.getIngredients = getIngredients;

        $scope.$on('$viewContentLoaded', function () {
            App.init();
            App.initScrollBar();
            App.initParallaxBg();
            RevolutionSlider.initRSfullWidth();
            StyleSwitcher.initStyleSwitcher();
        });

        init();

        function init() {
            $scope.ingredientsTemplate = homeService.initIngredients();  
            $scope.recipes = homeService.getRecipes();
            $scope.omitRestrictions = true;
            $scope.omitDislikeIngs = true;
            $scope.omitCategories = true;

        };

        function getIngredients() {
            return ingredientService.getIngredients();
        }

        function updateIngredientToFull(ingSelected, ingFromTemplate) {
            ingFromTemplate.name = ingSelected.name;
            ingFromTemplate.image = ingSelected.image_url;
            ingFromTemplate.templateType = 'full';
            ingFromTemplate.id = ingSelected.id;
            ingFromTemplate.category = ingSelected.category;
        }

        function updateIngredientToEmpty(ingFromTemplate) {
            ingFromTemplate.name = '';
            ingFromTemplate.image = 'assets/img/newLogo.jpg';
            ingFromTemplate.templateType = 'empty';
            ingFromTemplate.id = null;
            ingFromTemplate.category = null;
        }

        function removeIngredient(ingFromTemplate) {
            updateIngredientToEmpty(ingFromTemplate);
        }

        function isEmpty(ingredient) {
            return homeService.isEmpty(ingredient);
        }

        function getDetailIng(id) {
            template = '/general/modals/ingredient';
            controller = 'IngredientModalController';
            ingredientFactory.get({ id: id }, function (ing) {
                homeService.openModal(ing, template, controller);
            });
        }

        function getDetailsRecipe(id) {
            $location.path('/recipe/' + id + '/detail');
        }

        function search() {
            var ingsToSend = homeService.getIngsWithData($scope.ingredientsTemplate); 
            if (ingsToSend.length < 1) {
                notifyHelper.warn('Debes seleccionar al menos un ingrediente');
            } else {
                //completar settings
               $scope.recipes =  homeService.search(ingsToSend, $scope.settings);
            }
        }

        function removeIngredients() {
            angular.forEach($scope.ingredientsTemplate, function (ing) {
                $scope.removeIngredient(ing);
            })
        }

        function isLogged() {
            return UserSession.isLogged();
        }

        function resetSearch() {
            $scope.recipes = [];
            homeService.resetRecipes();
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

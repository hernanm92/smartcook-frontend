app.controller('HomeController',
    function ($scope, ingredientService, homeService, $location,
              notifyHelper, UserSession, userFactory, blockUI, $modal, $q, RecipeUser) {

        //private
        var self = this;
        self.ingsToSend = [];

        //set Values
        $scope.ingredientsTemplate = [];
        $scope.omitRestrictions = false;
        $scope.omitDislikeIngs = false;
        $scope.omitCategories = false;

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
        $scope.addDiner = addDiner;
        //-------------------Favorites
        if (UserSession.isLogged()) {
            RecipeUser.getRecipesOfUser().then(function (userRecipes) {
                $scope.userRecipes = userRecipes;
                $scope.userFavoriteRecipes = RecipeUser.getFavoritesFromRecipes(userRecipes);
            });
            $scope.isFavorite = function (recipe) {
                return RecipeUser.isFavorite(recipe, $scope.userFavoriteRecipes)
            };
            $scope.removeFromFavorites = function (recipe) {
                RecipeUser.removeFromFavorites(recipe, $scope.userRecipes, $scope.userFavoriteRecipes);
            };
            $scope.addToFavorites = function (recipe) {
                RecipeUser.addToFavorites(recipe, $scope.userRecipes, $scope.userFavoriteRecipes);
            };
        }
        //----------------------------
        $scope.$on('$viewContentLoaded', function () {
            App.init();
            App.initScrollBar();
            App.initParallaxBg();
            RevolutionSlider.initRSfullWidth();
            StyleSwitcher.initStyleSwitcher();
        });

        init();

        function addDiner() {
            blockUI.start();
            template = '/general/commensalsModal';
            controller = 'comensalsForSearchController';
            userFactory.query({chef: UserSession.getUsername()}, function (frequentsUsers) {
                blockUI.stop();
                openModal(frequentsUsers, template, controller);
            });
        }

        function init() {
            if (UserSession.isLogged()) {
                UserSession.getProfile().then(function (profileUser) {
                    $scope.vegan = profileUser.vegan ? true : undefined; //con undefined, no lo toma como filtro 
                    $scope.vegetarian = profileUser.vegetarian ? true : undefined;
                    $scope.celaic = profileUser.celiac ? true : undefined;
                    $scope.diabetic = profileUser.diabetic ? true : undefined;
                });
            }
            $scope.ingredientsTemplate = homeService.initIngredients();
            $scope.recipes = homeService.getRecipes();
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
            ingredientService.getDetail(id);
        }

        function getDetailsRecipe(id) {
            $location.path('/recipe/' + id + '/detail');
        }

        function search() {
            var ingsToSend = homeService.getIngsWithData($scope.ingredientsTemplate);
            if (ingsToSend.length < 1) {
                notifyHelper.warn('Debes seleccionar al menos un ingrediente');
            } else {
                var settings = getSettings();
                $scope.recipes = homeService.search(ingsToSend, settings);
            }
        }

        function getSettings() {
            return {
                omitRestrictions: $scope.omitRestrictions,
                //omitDislikeIngs = $scope.omitDislikeIngs
                omitCategories: $scope.omitCategories
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
        function openModal(frequentsUsers, template, controller) {
            return $modal.open({
                animation: true,
                templateUrl: template,
                controller: controller,
                size: 'md',
                resolve: {
                    frequentsUsers: function () {
                        var users = []
                            , promises = [];
                        angular.forEach(frequentsUsers, function (frequentUser) {
                            promises.push(userFactory.get({username: frequentUser.frequent_username}).$promise);
                        });
                        return $q.all(promises).then(function (values) {
                            //
                            return values;
                        })

                    }
                },
                windowClass: 'menu-bar-space'
            });
        };
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

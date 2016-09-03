app.controller('LoadIngredientController',
    function ($scope, ingredientFactory, categoriesFactory, $modal, imgService, blockUI) {
            //global variables
            $scope.categories = [];
            $scope.validateForm = validateForm;
            $scope.openModal = openModal;
            $scope.calories = 0;
            $scope.proteins = 0;
            $scope.carbohydrates = 0;
            $scope.fats = 0;

            $scope.categories = loadAllCategories();
            $scope.querySearch = querySearch;

            function validateForm(isValid) {
                console.log($scope.fats);
                $scope.submitted = true;
                if (isValid) {
                    confirmForm();
                } else {
                    $scope.recipeErrorMessage = "Debe completar los datos del ingrediente";
                }
            };

            function openModal(message, title) {
                return $modal.open({
                    animation: true,
                    templateUrl: '/general/confirmForm',
                    controller: 'ModalController',
                    size: 'sm',
                    resolve: {
                        message: function () {
                            return message;
                        },
                        title: function () {
                            return title;
                        }
                    },
                    windowClass: 'menu-bar-space'
                });
            };

            function confirmForm() {
                var message = 'El ingrediente sera guardado, desea continuar?';
                var title = 'Guardar Ingrediente';
                openModal(message, title).result.then(function () {
                    saveIngredient();
                });
            };

            function saveIngredient() {
                blockUI.start(); //TODO: Esto
                var photoName = imgService.getUrlImgRecipe($scope.nameRecipe);
                var recipe = new Recipe(UserSession.getUserId(), $scope.nameRecipe, $scope.ingredients, $scope.steps, $scope.description, photoName);
                recipeFactory.save(recipe, function (res) {
                    imgService.uploadImgRecipe($scope.nameRecipe, $scope.picFile);
                    openModal('Su receta ha sido guardada exitosamente, entrara al proceso de validacion', 'Receta Guardada');
                });
                blockUI.stop();
            }

            function querySearch (query) {
                  var results = query ? self.categories.filter( createFilterFor(query) ) : self.categories,
                      deferred;
                  if (self.simulateQuery) {
                    deferred = $q.defer();
                    $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                    return deferred.promise;
                  } else {
                    return results;
                  }
                }
            function loadAllCategories(text) {
              var allCategories = categoriesFactory.query({ text: text }).$promise;
              return allCategories;
            }
            function createFilterFor(query) {
              var lowercaseQuery = angular.lowercase(query);
              return function filterFn(category) {
                return (category.value.indexOf(lowercaseQuery) === 0);
              };
            }



        }
);


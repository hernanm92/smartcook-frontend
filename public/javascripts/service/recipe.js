angular
    .module('MainApp')
    .service('recipeService', recipeService);

function recipeService(recipeFactory, Recipe, ingredientFactory, imgService, UserSession, blockUI, notifyHelper,
    ingredientPerRecipeFactory, $interval, recipePerUserFactory, mapperService, $q, ingredientPerRecipePersistFactory, $window) {
    var self = this;
    self.units = [{ name: 'gramos' }, { name: 'Taza' }, { name: 'Unidad(es)' }, { name: 'mililitro' }, { name: 'Cucharada' }];
    self.recipes = [];
    self.getRecipes = getRecipes;
    self.getUnits = getUnits;
    self.save = save;
    self.create = create;
    self.refresh = refresh;
    self.getDetailRecipe = getDetailRecipe;
    self.edit = edit;

    init();
    refresh();

    function init() {
        recipeFactory.query({}, function (recipes) {
            self.recipes = recipes;
            /*angular.forEach(recipes, function (recipe) {
                var recipePerUser = {
                    recipe_id: recipe.id,
                    username: 'matileon',
                    favorite: true,
                    owner: true
                }
                recipePerUserFactory.save(recipePerUser, function () {
                })
            });
            */
        });
    }

    function getRecipes() {
        return self.recipes;
    }

    function getUnits() {
        return self.units;
    }

    function save(recipe, photoRecipe, username) {
        blockUI.start();
        recipe.image_url = imgService.getUrlImgRecipe(recipe.name);
        var username = UserSession.getUsername();
        var promises = {
            recipePromise: recipeFactory.save(mapperService.mapRecipeForPersist(recipe)).$promise,
            imgPromise: imgService.uploadImgRecipe(recipe.name, photoRecipe),
        }
        $q.all(promises).then(function (values) {
            angular.forEach(recipe.ingredients, function (ing) {
                var ingMapped = mapperService.mapIngForPersist(ing, values.recipePromise)
                ingredientPerRecipePersistFactory.save(ingMapped, function (res) {
                });
            });
            recipePerUserFactory.save(mapperService.mapRecipePerUserOwner(values.recipePromise, username));
            blockUI.stop();
            notifyHelper.success('Su receta ha sido guardada exitosamente');
        });

    }

    function edit(recipe, file, username) {
        $window.alert('Enviando datos');
        console.log(recipe);
        console.log(file);
    }

    function create() {
        return new Recipe(UserSession.getUserId(), null, [], [], null, null);
    }

    function refresh() {
        $interval(init, 20000);
    }

    //userId,name,ingredients,steps,description,image_url)
    function getDetailRecipe(id) {
        blockUI.start();
        var recipeToEdit = new Recipe(UserSession.getUserId(), null, [], [], null, null);
        recipeFactory.get({ id: id }, function (recipe) {
            recipeToEdit.name = recipe.name;
            recipeToEdit.description = recipe.description;
            recipeToEdit.image_url = recipe.image_url;
            recipeToEdit.steps = recipe.steps;
            //ingsPerRecipe
            ingredientFactory.query({ recipe_id: id }, function (ingsFromRecipe) {
                angular.forEach(ingsFromRecipe, function (ingFromRecipe) {
                    //ingAmounts
                    ingredientPerRecipeFactory.get({ recipe_id: id, ingredient_id: ingFromRecipe.id }, function (ingAmounts) {
                        recipeToEdit.ingredients.push(mapToView(ingFromRecipe, ingAmounts))
                        blockUI.stop();
                    })
                });
            });
        });
        return recipeToEdit;
    }

    function mapToView(ingDesc, ingAmounts) {
        return {
            name: ingDesc.name,
            amount: ingAmounts.amount,
            unit: getUnitBy(ingAmounts.unit)
        }
    }

    function getUnitBy(name) {
        var unitFound = null;
        angular.forEach(self.units, function (unit) {
            if (unit.name === name) {
                var unitFound = unit;
            };
        });
        return unitFound;
    }
};
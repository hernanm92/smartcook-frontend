angular
    .module('MainApp')
    .service('recipeService', recipeService);

function recipeService(recipeFactory, Recipe, ingredientFactory, imgService, UserSession, blockUI, notifyHelper, ingredientPerRecipeFactory, $interval) {
    var self = this;
    self.units = [{ name: 'gramos' }, { name: 'Taza' }, { name: 'Unidad(es)' }, { name: 'mililitro' }, { name: 'Cucharada' }];
    self.recipes = [];
    self.getRecipes = getRecipes;
    self.getUnits = getUnits;
    self.save = save;
    self.create = create;
    self.refresh = refresh;
    self.getDetailRecipe = getDetailRecipe;

    init();
    refresh();

    function init() {
        recipeFactory.query({}, function (recipes) {
            self.recipes = recipes;
        });
    }

    function getRecipes() {
        return self.recipes;
    }

    function getUnits() {
        return self.units;
    }

    function save(recipe, photoRecipe) {
        blockUI.start();
        recipe.image_url = imgService.getUrlImgRecipe(recipe.name);
        recipeFactory.save(mapRecipeFromView(recipe), function (persistedRecipe) {
            angular.forEach(recipe.ingredients, function (ing) {
                ingredientPerRecipeFactory.save(mapIngFromView(ing, persistedRecipe), function (res) {
                });

            })
            imgService.uploadImgRecipe(recipe.name, photoRecipe);
            notifyHelper.success('Su receta ha sido guardada exitosamente');
        });
        blockUI.stop();
    }

    function create() {
        return new Recipe(UserSession.getUserId(), null, [], [], null, null);
    }

    function mapRecipeFromView(recipe) {
        return {
            name: recipe.name,
            image_url: recipe.image_url,
            description: recipe.description,
            steps: recipe.steps
        }
    }

    function mapIngFromView(ing, recipe) {
        return {
            ingredient_id: ing.id,
            recipe_id: recipe.id,
            amount: ing.amount,
            unit: ing.unit.name
        }
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
            amount: ingAmounts.amount
        }
    }

    function getUnitBy(name) {
        return angular.forEach(self.units, function (unit) {
            if (unit.name.indexOf(name) > -1){
                return unit;
            }
        })
    }
};
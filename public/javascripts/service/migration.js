angular
    .module('MainApp')
    .service('MigrationService', MigrationService);

function MigrationService(recipeService, imgService, ingredientFactory, $timeout, $http, $q,
    recipeFactory, categoriesFactory, ingredientPerRecipePersistFactory, recipePerUserFactory, mapperService, $interval) {

    var self = this;
    self.init = init;

    function init() {
        //getCategories(); //listo
        //getIngredients();  //listo
        //getRecipes();
        //crear relaciones con receta
        //insignias
    }

    function getCategories() {
        $http.get('http://localhost:9000/migration/categories').then(function (categories) {
            self.categories = categories.data;
            migrateCategories();
        })
    }


    function migrateCategories() {
        $interval(function () {
            var category = self.categories.shift();
            console.log(category + 'enviado');
            categoriesFactory.save({ name: category.name }, function (res) {
                console.log(res);
            })
        }, 3000);
    }

    function getIngredients() {
        $http.get('http://localhost:9000/migration/ingredients').then(function (ingredients) {
            self.ingredients = ingredients.data;
            migrateIngredients();
        });
    }

    function migrateIngredients() {
        $interval(function () {
            var ing = self.ingredients.shift();
            ing.image_url = 'https://imgsmartcook.blob.core.windows.net/ingredients/' + ing.image_url.split("/")[1].toLowerCase();
            $http.post('http://localhost:5000/ingredients', ing).then(function (res) {
                console.log('Guardado ' + ing.name);
            })
        }, 1000);
    }

    function getRecipes() {
        $http.get('http://localhost:9000/migration/recipes').then(function (recipes) {
            self.recipes = recipes.data;
            $http.get('http://localhost:5000/ingredients').then(function (ingredients) {
                self.ingredients = ingredients.data;
                migrateRecipes();
            })
        });
    }

    function migrateRecipes() {
        $interval(function () {
            var recipe = self.recipes.shift();
            console.log('Enviando: ' + recipe.name);
            migrateRecipe(recipe);
        }, 3000);
    }

    function migrateRecipe(recipe) {
        var imgName = recipe.image_url.split('recipe_img/');
        recipe.image_url = imgService.getUrlImgRecipe(imgName[1]);
        //save recipemapperService
        $http.post('http://localhost:5000/recipes', recipe).then(function (recipePersisted) {
            console.log('Receta guardada:' + recipePersisted.data.name)
            angular.forEach(recipe.ingredients, function (ing) {
                ing.ingredient_id = getIdFrom(ing.name_id, self.ingredients);
            });
            angular.forEach(recipe.ingredients, function (ing) {
                var ingMapped = mapIngForPersist(ing, recipePersisted.data)
                ingredientPerRecipePersistFactory.save(ingMapped, function (res) {
                    console.log(ingMapped.ingredient_id + 'relacion guardada');
                });
            });
            //recipePerUserFactory.save(mapperService.mapRecipePerUserOwner(recipePersisted, 'matileon'));
        })
    }

    function getIdFrom(name_id, ingredients) {
        var ingredient_id;
        angular.forEach(ingredients, function (ing) {
            if (ing.name_id === name_id) {
                ingredient_id = ing.id
            }
        })
        return ingredient_id;
    }

    function mapIngForPersist(ing, recipe) {
        return {
            ingredient_id: ing.ingredient_id,
            recipe_id: recipe.id,
            amount: ing.quantity,
            unit: mapUnit(ing)
        }
    }

    function mapUnit(ing) {
        var unit = '';
        switch (ing.unit) {
            case 'unidad':
                unit = 'Unidad(es)';
                break;
            case 'gr':
                unit = 'Gramos';
                break
            case 'cucharada':
                unit = 'Cucharada(s)';
                break
            case 'lata':
                unit = 'Lata(s)';
                break
            case 'caja':
                unit = 'Caja(s)';
                break
            case 'ml':
                unit = 'Mililitros';
                break
            default:
                unit = ing.unit;
                break;
        }
        return unit;
    }
}
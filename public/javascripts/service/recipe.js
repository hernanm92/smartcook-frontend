angular
    .module('MainApp')
    .service('recipeService', recipeService);

function recipeService(recipeFactory, Recipe, ingredientFactory, imgService, UserSession, blockUI, notifyHelper,
    ingredientPerRecipeFactory, $interval, recipePerUserFactory, mapperService, $q, ingredientPerRecipePersistFactory, query,
    NavigationService, $timeout) {

    var self = this;
    self.units = [{ name: 'Gramo(s)' }, { name: 'Taza(s)' }, { name: 'Unidad(es)' }, { name: 'Mililitro(s)' }, { name: 'Cucharada(s)' }, { name: 'Lata(s)' }, { name: 'Kilogramo(s)' }];
    self.recipes = [];
    self.getRecipes = getRecipes;
    self.getUnits = getUnits;
    self.save = save;
    self.create = create;
    self.refresh = refresh;
    self.getDetailRecipe = getDetailRecipe;
    self.edit = edit;
    self.getRecipeByName = getRecipeByName;
    self.existName = existName;

    init();
    refresh();

    function init() {
        blockUI.start()
        recipeFactory.query({}, function (recipes) {
            blockUI.stop();
            self.recipes = recipes;
        });
    }

    function existName(name) {
        return query.exists(self.recipes, 'name', name);
    }

    function getRecipes() {
        return self.recipes;
    }

    function getUnits() {
        return self.units;
    }

    function save(recipe, photoRecipe) {
        recipe.image_url = imgService.getUrlImgRecipe(recipe.name);
        sendRecipe(recipe, photoRecipe, mapperService.mapRecipeForPersist);
    }

    function edit(recipe, file) {
        //creo una receta pero con original, en el back cuando llega a un x de validacion, se tiene q borrar la vieja y poner la nueva
        //con original == nil
        if (file !== undefined) {
            recipe.image_url = imgService.getUrlImgRecipe(recipe.name);
        }
        sendRecipe(recipe, file, mapperService.mapRecipeForEdit)
    }

    //refactor
    function sendRecipe(recipe, photoRecipe, mapper) {
        blockUI.start();
        if (photoRecipe !== undefined) {
            imgService.uploadImgRecipe(recipe.name, photoRecipe);
        }
        var promises = {
            recipePromise: recipeFactory.save(mapper(recipe)).$promise,
        };
        $q.all(promises).then(function (values) {
            angular.forEach(recipe.ingredients, function (ing) { //persisto cada ingrediente
                var ingMapped = mapperService.mapIngForPersist(ing, values.recipePromise)
                ingredientPerRecipePersistFactory.save(ingMapped, function (res) {
                });
            });
            self.recipeId = values.recipePromise.id;
            recipePerUserFactory.save(mapperService.mapRecipePerUserOwner(values.recipePromise, UserSession.getUsername()));
            $timeout(finishCreation, 2000);
        });
    }

    function finishCreation() {
        blockUI.stop();
        notifyHelper.success('Su receta ha sido guardada exitosamente, entrará al proceso de validación');
        NavigationService.goToRecipeDetail(self.recipeId);
    }

    function create() {
        return new Recipe(UserSession.getUserId(), null, [], [], null, null);
    }

    function refresh() {
        $interval(loadrecipes, 20000);
    }

    function loadrecipes() {
        recipeFactory.query({}, function (recipes) {
            self.recipes = recipes;
        });
    }

    //userId,name,ingredients,steps,description,image_url)
    function getDetailRecipe(id) {
        blockUI.start();
        var deferred = $q.defer();
        var recipeToEdit = new Recipe(id, null, [], [], null, null);
        recipeFactory.get({ id: id }, function (recipe) {
            recipeToEdit.name = recipe.name;
            recipeToEdit.description = recipe.description;
            recipeToEdit.image_url = recipe.image_url;
            recipeToEdit.steps = recipe.steps;
            //ingsPerRecipe
            ingredientFactory.query({ recipe_id: id }, function (ingsFromRecipe) {
                var promiseIngs = [];
                angular.forEach(ingsFromRecipe, function (ingFromRecipe, key) {
                    //ingAmounts
                    ingredientPerRecipeFactory.get({ recipe_id: id, ingredient_id: ingFromRecipe.id }, function (ingAmounts) {
                        recipeToEdit.ingredients.push(mapToView(ingFromRecipe, ingAmounts));
                        if (ingsFromRecipe.length === (key + 1)) { //key es el index, cuando termine con el ultimo termina la oper async
                            deferred.resolve(recipeToEdit);
                            blockUI.stop();
                        }
                    });
                });
            });
        });
        return deferred.promise;
    }

    function mapToView(ingDesc, ingAmounts) {
        return {
            name: ingDesc.name,
            amount: ingAmounts.amount,
            unit: getUnitBy(ingAmounts.unit),
            id: ingDesc.id
        }
    }

    function getUnitBy(name) {
        var unitFound = null;
        var units = self.units;
        angular.forEach(units, function (unit) {
            if (unit.name.toLowerCase() === name.toLowerCase()) {
                unitFound = unit;
            };
        });
        return unitFound;
    }

    function getRecipeByName(recipeName) {
        return $(self.recipes).filter(function () {
            return removeAccents(this.name.toLowerCase()).indexOf(removeAccents(recipeName.toLowerCase())) >= 0
        });
    }

    function removeAccents(word) {
        return word
            .replace(/[áàãâä]/gi, "a")
            .replace(/[éè¨ê]/gi, "e")
            .replace(/[íìïî]/gi, "i")
            .replace(/[óòöôõ]/gi, "o")
            .replace(/[úùüû]/gi, "u")
            .replace(/[ç]/gi, "c")
            .replace(/[ñ]/gi, "n")
            .replace(/[^a-zA-Z0-9]/g, " ");
    }
};

angular
    .module('MainApp')
    .service('searcher', searcher);

function searcher(blockUI, recipeSearchFactory, mapperService) {
    var self = this;
    self.recipes = [];
    self.getRecipes = getRecipes;
    self.resetRecipes = resetRecipes;
    self.searchBy = searchBy;

    function searchBy(ings, userSettings, profile) {
        return getRecipesBy(ings, userSettings, profile);
    }

    function getRecipesBy(ings, userSettings, profile) {
        blockUI.start();
        var ingsToSend = mapperService.mapIngredientsForSearch(ings);
        var profileDto = mapperService.mapProfileForSearch(userSettings, profile);
        return recipeSearchFactory.query(
            {
                ingredients: ingsToSend,
                food_categories: profileDto.food_categories_ids,
                vegan: profileDto.vegan,
                vegetarian: profileDto.vegetarian,
                celiac: profileDto.vegetarian,
                diabetic: profileDto.diabetic
            },
            function (recipes) {
                blockUI.stop();
                return self.recipes = recipes;
            });
    }

    function resetRecipes() {
        self.recipes = [];
    }

    function getRecipes() {
        return self.recipes;
    }
}


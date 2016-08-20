angular
    .module('MainApp')
    .service('searcher', searcher);

function searcher(recipeFactory, blockUI) {
    var self = this;
    self.getRecipesBy = getRecipesBy;
    self.recipes = [];
    self.getRecipes = getRecipes;
    self.resetRecipes = resetRecipes;

    function getRecipes() {
        return self.recipes;
    }

    function getRecipesBy(ings) {
        blockUI.start();
        if (self.recipes.length < 1 || typeof ings !== 'undefined') {
            return recipeFactory.query({ ings: ings }, function (recipes) {
                blockUI.stop();
                return self.recipes = recipes
            });
        } else {
            blockUI.stop();
            return self.recipes;
        }
    }

    function resetRecipes() {
        self.recipes = [];
    }
}

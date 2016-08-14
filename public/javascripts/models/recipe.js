(function () {
    angular.module('MainApp').
    factory('Recipe',RecipeFactory);

    function RecipeFactory() {
        function Recipe(userId,name,ingredients,steps,description,photoRecipe) {
            this.userId = userId;
            this.name = name;
            this.ingredients = ingredients;
            this.steps = steps;
            this.description = description;
            this.photoRecipe = photoRecipe;
        }
        return Recipe;
    }
})();

(function () {
    angular.module('MainApp').
    factory('Recipe',RecipeFactory);

    function RecipeFactory() {
        function Recipe(userId,name,ingredients,steps,description,image_url) {
            this.userId = userId;
            this.name = name;
            this.ingredients = ingredients;
            this.steps = steps;
            this.description = description;
            this.image_url = image_url;
        }
        return Recipe;
    }
})();

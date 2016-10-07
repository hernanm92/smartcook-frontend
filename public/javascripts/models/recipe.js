(function () {
    angular.module('MainApp').
        factory('Recipe', RecipeFactory);

    function RecipeFactory() {
        function Recipe(id, name, ingredients, steps, description, image_url) {
            this.id = id;
            this.name = name;
            this.ingredients = ingredients;
            this.steps = steps;
            this.description = description;
            this.image_url = image_url;
        }
        return Recipe;
    }
})();

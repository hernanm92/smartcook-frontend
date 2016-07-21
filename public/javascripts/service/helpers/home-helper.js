angular
    .module('MainApp')
    .service('homeHelper', homeHelper);

function homeHelper() {
    return {
        initIngredients:initIngredients
    }

    function createEmptyIngredient() {
        return {
            name: '',
            image: 'assets/img/blog/09.jpg',
            templateType: 'empty',
            id: '',
            category: ''
        };
    };

    function initIngredients() {
        var ingredients = [];
        for (var index = 0; index < 4; index++) {
            var ing = createEmptyIngredient();
            ingredients.push(ing);
        };
        return ingredients;
    };
}
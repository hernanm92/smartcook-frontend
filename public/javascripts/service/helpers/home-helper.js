angular
    .module('MainApp')
    .service('homeHelper', homeHelper);

function homeHelper($modal) {
    return {
        initIngredients: initIngredients,
        openModal: openModal
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


    function openModal(item, template, controller) {
        return $modal.open({
            animation: true,
            templateUrl: template,
            controller: controller,
            size: 'lg',
            resolve: {
                item: function () {
                    return item;
                }
            },
            windowClass: 'menu-bar-space'
        });
    };
}
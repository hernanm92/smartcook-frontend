angular
    .module('MainApp')
    .service('homeHelper', homeHelper);

function homeHelper($modal) {
    var self = this;
    self.createEmptyIngredient = createEmptyIngredient
    self.initIngredients = initIngredients;
    self.openModal = openModal;
    self.getIndexElemFrom = getIndexElemFrom;
    self.getIngsWithData = getIngsWithData;
    self.isEmpty = isEmpty;

    function getIngsWithData(ingsTemplate) {
        var ingsToSend = [];
        angular.forEach(ingsTemplate, function (ing) {
            if(!self.isEmpty(ing)){
                ingsToSend.push(ing);
            }
        });
        return ingsToSend;
    }

    function isEmpty(ing) {
        return ing.templateType === 'empty';
    }

    function createEmptyIngredient() {
        return {
            name: '',
            image: 'assets/img/newLogo.jpg',
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
            size: 'md',
            resolve: {
                item: function () {
                    return item;
                }
            },
            windowClass: 'menu-bar-space'
        });
    };

    /*Se pasa el id del elemento(objeto) y una lista y se obtiene
      la pos dentro del array
    */
    function getIndexElemFrom(id, list) {
        for (var index = 0; index < list.length; index++) {
            var element = list[index];
            if (element.id === id) {
                return index;
            }
        }
    }
}
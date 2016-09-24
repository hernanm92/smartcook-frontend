angular
    .module('MainApp')
    .service('homeService', homeService);

function homeService($modal, UserSession, searcher ) {
    
    var self = this;
    self.createEmptyIngredient = createEmptyIngredient
    self.initIngredients = initIngredients;
    self.getIndexElemFrom = getIndexElemFrom;
    self.getIngsWithData = getIngsWithData;
    self.isEmpty = isEmpty;
    self.search = search;
    self.getRecipes = getRecipes;
    self.resetRecipes = resetRecipes;

    function search(ings, settings) {
        var profile = UserSession.getUserProfile();
        return searcher.searchBy(ings, settings, profile);
    }

    function getRecipes() {
        return searcher.getRecipes();
    }

    function resetRecipes() {
        searcher.resetRecipes();
    }

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
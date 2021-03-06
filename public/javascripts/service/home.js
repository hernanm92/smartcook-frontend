angular
    .module('MainApp')
    .service('homeService', homeService);

function homeService($modal, UserSession, searcher, MergeProfile) {

    var self = this;
    self.commensalsProfile = [];
    self.createEmptyIngredient = createEmptyIngredient
    self.initIngredients = initIngredients;
    self.getIndexElemFrom = getIndexElemFrom;
    self.getIngsWithData = getIngsWithData;
    self.isEmpty = isEmpty;
    self.search = search;
    self.getRecipes = getRecipes;
    self.resetRecipes = resetRecipes;
    self.setCommensalProfile = setCommensalProfile;
    self.getCommensalProfile = getCommensalProfile;
    self.removeCommensalForSearch = removeCommensalForSearch;

    function search(ings, settings) {
        var profile = UserSession.getUserProfile();
        self.commensalsProfile.push(profile);
        var restrictions = MergeProfile.mergeProfiles(self.commensalsProfile);
        self.commensalsProfile = [];//para una nueva busqueda 
        return searcher.searchBy(ings, settings, restrictions);
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
            if (!self.isEmpty(ing)) {
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

    function setCommensalProfile(commensal) {
        self.commensalsProfile.push(commensal);
    }

    function getCommensalProfile() {
        return self.commensalsProfile;
    }

    function removeCommensalForSearch(username) {
        for (var index = 0; index < self.commensalsProfile.length; index++) {
            var commensal = self.commensalsProfile[index];
            if (commensal.username === username) {
                break;
            }
        }
        self.commensalsProfile.splice(index, 1);
    }
}
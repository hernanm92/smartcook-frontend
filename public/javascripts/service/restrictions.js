angular
    .module('MainApp')
    .service('restrictionsService', restrictionsService);

function restrictionsService() {
    var self = this;
    self.getRestrictions = getRestrictions;
    self.mapRestrictions = mapRestrictions;
    self.restrictions = [{ name: 'Celiaco' }, { name: 'Diabetico' }, { name: 'Vegano' }, { name: 'Vegetariano' }];

    function mapRestrictions(recipe) {
        var restrictions = [];
        recipe.diabetic ? restrictions.push('Diabetico') : null;
        recipe.celiac ? restrictions.push('Celiaco') : null;
        recipe.vegan ? restrictions.push('Vegano') : null;
        recipe.vegetarian ? restrictions.push('Vegetariano') : null;
        return restrictions;
    }

    function getRestrictions() {
        return self.restrictions;
    }
}
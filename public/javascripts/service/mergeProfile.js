angular
    .module('MainApp')
    .service('MergeProfile', mergeProfile);

function mergeProfile(Profile, userFactory, mapperService) {
    var self = this;
    self.mergeProfiles = mergeProfiles;
    self.setInitProfile = setInitProfile;
    self.initProfile = {};
    self.mergeRestrictions = mergeRestrictions;
    self.originalProfile = new Profile(null,null, null, null, null, [], [], [], null, null, null);
    //reemplzar por userModelFactory.emptyUser()


    function mergeProfiles(commensalsProfiles) {
        var profile = new Profile(null, null, null, null, null, [], [], [], null, null, null, null);
        angular.forEach(commensalsProfiles, function (commensalProfile) {
            merge(profile, commensalProfile);
        })
        return profile;
    }

    function merge(profile1, profile2) {
        mergeRestrictions(profile1, profile2);
        //restrictions
        mergeCategories(profile1, profile2);
        //categories
        //excludedIngs
        mergeExcludedIngredients(profile1, profile2);
    }

    function mergeExcludedIngredients(profile1, profile2) {
        //hacer lo mismo q con las categorias
        angular.forEach(profile2.ingredients, function (ingredient) {
            if (!existIngredient(profile1.ingredients, ingredient)) {
                profile1.ingredients.push(ingredient);
            };
        });
    }

    function existIngredient(ingredients, ingredientToSearch) {
        for (var index = 0; index < ingredients.length; index++) {
            var ingredient = ingredients[index];
            if (ingredient.id === ingredientToSearch.id) {
                return true;
            }
        }
        return false;
    }

    function mergeCategories(profile1, profile2) {
        //agregar al perfil1 las categorias sin repetidos.
        angular.forEach(profile2.categories, function (category) {
            if (!existCategory(profile1.categories, category)) {
                profile1.categories.push(category);
            }
        });
    }

    function mergeRestrictions(profile1, profile2) {
        profile1.vegan ? null : profile1.vegan = profile2.vegan;
        profile1.vegetarian ? null : profile1.vegetarian = profile2.vegetarian;
        profile1.diabetic ? null : profile1.diabetic = profile2.diabetic;
        profile1.celiac ? null : profile1.celiac = profile2.celiac;
    }

    function existCategory(categories, categoryToSearch) {
        var exist = false;
        angular.forEach(categories, function (category) {
            if (category.id === categoryToSearch.id) {
                exist = true;
            }
        });
        return exist;
    }

    function getCategoriesIds(categories) {
        var array = [];
        angular.forEach(categories, function (category) {
            var elem = { id: category.id }
            array.push(elem);
        })
        return array;
    }

    function setInitProfile(profile) {
        self.originalProfile.categories = profile.categories;
    }
}
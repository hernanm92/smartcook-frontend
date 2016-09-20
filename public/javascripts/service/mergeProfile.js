angular
    .module('MainApp')
    .service('MergeProfile', mergeProfile);

function mergeProfile(Profile, userFactory) {
    var self = this;
    self.merge = merge;
    self.setInitProfile = setInitProfile;
    self.initProfile = {};
    self.mergeRestrictions = mergeRestrictions;
    self.originalProfile = new Profile(null, null, null, [], [], [], []);

    //categories --> added, deleted
    //ings --> added, deleted
    function merge(profileChanged) {
        var categories = mergeCategories(profileChanged.categories, self.originalProfile.categories);
        var ingredients = mergeIngredients(profileChanged.ingredients);
        mergeRestrictions(profileChanged);
        profileChanged.categories = categories;
        return profileChanged;
    }

    function mergeIngredients(ingredientsChanged) {
        //TODO: Cuando este implementado en la api
        return [];
    }

    function mergeCategories(categoriesChanged, userCategories) {
        var added = getCategoriesAdded(categoriesChanged, userCategories);
        var deleted = getCategoriesDeleted(categoriesChanged, userCategories);
        return {
            added: mapCategoriesToSend(added),
            deleted: mapCategoriesToSend(deleted)
        };
    }

    function setInitProfile(profile) {
        self.originalProfile.categories = profile.categories;
    }

    function mergeRestrictions(profileChanged) {
        angular.forEach(profileChanged.restrictions, function (restriction) {
            restriction.name.indexOf('Celiaco') > -1 ? profileChanged.celiac = restriction.hasRestriction : null;
            restriction.name.indexOf('Vegetariano') > -1 ? profileChanged.vegetarian = restriction.hasRestriction : null;
            restriction.name.indexOf('Vegano') > -1 ? profileChanged.vegan = restriction.hasRestriction : null;
            restriction.name.indexOf('Diabetico') > -1 ? profileChanged.diabetic = restriction.hasRestriction : null;
        });
    }

    function getCategoriesAdded(categoriesChanged, userCategories) {
        var added = [];
        angular.forEach(categoriesChanged, function (category) {
            if (userCategories.indexOf(category.id) === -1) {
                added.push(category);
            };
        });
        return added;
    }

    function getCategoriesDeleted(categoriesChanged, userCategories) {
        var eliminated = [];
        angular.forEach(userCategories, function (category) {
            if (categoriesChanged.indexOf(category.id) === -1) {
                eliminated.push(category);
            };
        });
        return eliminated;
    }

    function mapCategoriesToSend(categories) {
        var mappedCategories = [];
        angular.forEach(categories, function (category) {
            mappedCategories.push({ food_category_id: category.id, username: self.originalProfile.username });
        })
        return mappedCategories;
    }
}
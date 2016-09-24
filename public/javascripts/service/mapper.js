angular
    .module('MainApp')
    .service('mapperService', mapperService);

function mapperService(Profile) {

    var self = this;
    self.mapProfileToModel = mapProfileToModel;
    self.mapIngredientsForSearch = mapIngredientsForSearch;
    self.mapProfileForSearch = mapProfileForSearch;

    // username, email, avatar, recipes, categories, ingredients, celiac, vegan, vegetarian, diabetic
    function mapProfileToModel(profileDto, categoriesDto, recipesDto) {
        var profile = new Profile(
            profileDto.username,
            profileDto.email,
            profileDto.avatar,
            recipesDto,
            categoriesDto,
            [],
            profileDto.celiac,
            profileDto.vegan,
            profileDto.vegetarian,
            profileDto.diabetic
        );
        return profile;
    }

    function mapIngredientsForSearch(ings) {
        var ingsToSend = []
        angular.forEach(ings, function (ing) {
            ingsToSend.push(ing.id);
        })
        return JSON.stringify(ingsToSend);
    }

    function mapProfileForSearch(userSettings, profile) {
        var profileDto = {};
        categoriesIds = mapCategories(profile.categories);
        userSettings.omitRestrictions ? omitRestrictions(profileDto) : considerRestrictions(profileDto, profile);
        userSettings.omitCategories ? profileDto.food_categories_ids = null : profileDto.food_categories_ids = categoriesIds;
        //userSettings.omitDislikeIngs ? dto.disLikeIngs = [] : dto.disLikeIngs = profile.disLikeIngs;
        return profileDto;
    }

    // private

    function considerRestrictions(dto, profile) {
        profile.celiac ? dto.celiac = true : dto.celiac = null;
        profile.vegetarian ? dto.vegetarian = true : dto.vegetarian = null;
        profile.diabetic ? dto.diabetic = true : dto.diabetic = null;
        profile.vegan ? dto.vegan = true : dto.vegan = null;
    }

    function omitRestrictions(dto) {
        dto.celiac = null;
        dto.diabetic = null;
        dto.vegan = null;
        dto.vegetarian = null;
    }

    function mapCategories(categories) {
        var categoriesToSend = [];
        if (categories.length > 0) {
            angular.forEach(categories, function (category) {
                categoriesToSend.push(category.id);
            })
            return JSON.stringify(categoriesToSend);
        } else {
            categoriesToSend = null;
            return categoriesToSend;
        }
    }
}
angular
    .module('MainApp')
    .service('mapperService', mapperService);

function mapperService(Profile) {

    var self = this;
    self.mapProfileToModel = mapProfileToModel;
    self.mapIngredientsForSearch = mapIngredientsForSearch;
    self.mapProfileForSearch = mapProfileForSearch;
    self.mapRecipeForPersist = mapRecipeForPersist;
    self.mapRecipePerUserOwner = mapRecipePerUserOwner;
    self.mapIngForPersist = mapIngForPersist;
    self.mapRecipeForEdit = mapRecipeForEdit;

    // username, email, avatar, recipes, categories, ingredients, celiac, vegan, vegetarian, diabetic
    function mapProfileToModel(profileDto, categoriesDto, recipesDto, ingredientsDto) {
        var profile = new Profile(
            profileDto.name, 
            profileDto.username,
            profileDto.email,
            profileDto.avatar,
            profileDto.birthdate,
            recipesDto,
            categoriesDto,
            ingredientsDto,
            profileDto.celiac,
            profileDto.vegan,
            profileDto.vegetarian,
            profileDto.diabetic,
            profileDto.badges
        );
        return profile;
    }

    function mapIngredientsForSearch(ings) {
        var ingsToSend = []
        angular.forEach(ings, function (ing) {
            ingsToSend.push(ing.id);
        })
        return ingsToSend;
    }

    function mapProfileForSearch(userSettings, profile) {
        var profileDto = {};
        categoriesIds = mapCategories(profile.categories);
        excludedIngredientsIds = mapExcludedIngredients(profile.ingredients);//falta hacer funcion 
        userSettings.omitRestrictions ? omitRestrictions(profileDto) : considerRestrictions(profileDto, profile);
        userSettings.omitCategories ? profileDto.food_categories_ids = null : profileDto.food_categories_ids = categoriesIds;
        userSettings.omitDislikeIngs ? profileDto.ingredients_ids = null : profileDto.ingredients_ids = excludedIngredientsIds;
        return profileDto;
    }

    function mapRecipeForPersist(recipe) {
        return {
            name: recipe.name,
            image_url: recipe.image_url,
            description: recipe.description,
            steps: recipe.steps,
            validated: false,
            original: null
        }
    }

    function mapRecipeForEdit(recipe) {
        var recipeDto = {
            name: recipe.name,
            image_url: recipe.image_url,
            description: recipe.description,
            steps: recipe.steps,
            validated: false,
            original: recipe.id
        }
        return recipeDto;
    }

    function mapIngForPersist(ing, recipe) {
        return {
            ingredient_id: ing.id,
            recipe_id: recipe.id,
            amount: ing.amount,
            unit: ing.unit.name
        }
    }

    function mapRecipePerUserOwner(recipe, username) {
        var recipeDto = {
            recipe_id: recipe.id,
            username: username,
            owner: true,
            favorite: true,
            validated: false
        }
        return recipeDto;
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
            return categoriesToSend;
        } else {
            categoriesToSend = null;
            return categoriesToSend;
        }
    }

    function mapExcludedIngredients(ingredients) {
        var ingsToSend = [];
        if (ingredients.length > 0) {
            angular.forEach(ingredients, function (ingredient) {
                ingsToSend.push(ingredient.id);
            })
            return ingsToSend;
        } else {
            ingsToSend = null;
            return ingsToSend;
        }
    }

    /**
 *       recipe_id: params.require(:recipe_id),
      username: params.require(:username),
      favorite: params.require(:favorite),
      owner: params.require(:owner),
      like: params[:like],
      vote: params[:vote]
 * */
}
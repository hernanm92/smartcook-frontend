angular
    .module('MainApp')
    .service('searcher', searcher);

function searcher(blockUI, UserSession, recipeSearchFactory) {
    var self = this;
    self.getRecipesBy = getRecipesBy;
    self.recipes = [];
    self.getRecipes = getRecipes;
    self.resetRecipes = resetRecipes;
    self.search = search;
    self.searchByProfile = searchByProfile;

    function searchByProfile(ings, userSettings) {
        return UserSession.profileInfo().then(function (profile) {
            return getRecipesBy(ings, userSettings, profile);
        });
    }

    function search(ings) {
        blockUI.start();
        var ingsToSend = []
        angular.forEach(ings, function (ing) {
            ingsToSend.push(ing.id);
        })
        return recipeSearchFactory.query(
            { ingredients: JSON.stringify(ingsToSend) },
            function (recipes) {
                blockUI.stop();
                return self.recipes = recipes;
            });
    }

    function getRecipesBy(ings, userSettings, profile) {
        blockUI.start();
        var params = mapSettings(userSettings, profile)
        return recipeSearchFactory.query(
            {
                ingredients: ings,
                food_categories: params.food_categories,
                vegan: params.vegan,
                vegetarian: params.vegetarian,
                celiac: params.vegetarian,
                diabetic: params.diabetic
            },
            function (recipes) {
                blockUI.stop();
                return self.recipes = recipes;
            });
    }

    function resetRecipes() {
        self.recipes = [];
    }

    function getRecipes() {
        return self.recipes;
    }

    function mapSettings(userSettings, profile) {
        var dto = {};
        userSettings.omitRestrictions ? omitRestrictions(dto) : considerRestrictions(dto, profile);
        //userSettings.omitDislikeIngs ? dto.disLikeIngs = [] : dto.disLikeIngs = profile.disLikeIngs;
        userSettings.omitCategories ? dto.food_categories = [] : dto.food_categories = profile.food_categories;
        return dto;
    }

    function omitRestrictions(dto) {
        dto.celiac = false;
        dto.diabetic = false;
        dto.vegan = false;
        dto.vegetarian = false;
    }

    function considerRestrictions(dto, profile) {
        dto.celiac = profile.celiac;
        dto.vegetarian = profile.vegetarian;
        dto.diabetic = profile.diabetic;
        dto.vegan = profil.vegan;
    }
}

/*
  def recipe_search_params
    {
      ingredients: params.require(:ingredients),
      food_categories: params[:food_categories],
      vegan: params[:vegan],
      vegetarian: params[:vegetarian],
      celiac: params[:celiac],
      diabetic: params[:diabetic]
    }
    Cambio vegan, vegetarian, etc  x  restrictions 
  end*/


angular
    .module('MainApp')
    .service('searcher', searcher);

function searcher(recipeFactory, blockUI, UserSession) {
    var self = this;
    self.getRecipesBy = getRecipesBy;
    self.recipes = [];
    self.getRecipes = getRecipes;
    self.resetRecipes = resetRecipes;
    self.search = search;
    self.searchByProfile = searchByProfile;

    function searchByProfile(ings, userSettings) {
        var profile = UserSession.profileInfo();
        var recipeSearchParams = mapSettings(ings,userSettings);
       return getRecipesBy(recipeSearchParams);
    }

    function search (ings) {
        var recipe_search_params = {ingredients:ings};
        return getRecipesBy(recipe_search_params);
    }

    function getRecipes() {
        return self.recipes;
    }
    
    function getRecipesBy(recipeSearchParams) {
        blockUI.start();
        return recipeFactory.query({ recipe_search_params: recipeSearchParams }, function (recipes) {
            blockUI.stop();
            return self.recipes = recipes; 
        });
    }

    function resetRecipes() {
        self.recipes = [];
    }

        function mapSettings(ings, userSettings, profile) {
        var dto = {};
        userSettings.omitRestrictions ?  omitRestrictions(dto) : considerRestrictions(dto,profile);
        //userSettings.omitDislikeIngs ? dto.disLikeIngs = [] : dto.disLikeIngs = profile.disLikeIngs;
        userSettings.omitCategories ? dto.food_categories = [] : dto.food_categories = profile.food_categories;
        dto.ingredients = ings;
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
  end*/


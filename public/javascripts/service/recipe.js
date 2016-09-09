angular
    .module('MainApp')
    .service('recipeService', recipeService);

    function recipeService (recipeFactory,Recipe, imgService, UserSession, blockUI, notifyHelper, ingredientPerRecipeFactory,$interval){
        var self = this;
        self.units = [{name:'gramos'},{name:'Taza'},{name:'Unidad'},{name:'mililitro'}];
        self.recipes = [];
        self.getRecipes = getRecipes;
        self.getUnits = getUnits;
        self.save = save;
        self.create = create;
        self.refresh = refresh;

        init();
        refresh();
        
        function init() {
            recipeFactory.query({}, function(recipes){
                 self.recipes = recipes;
            });    
        }

        function getRecipes () {
            return self.recipes;
        }

        function getUnits() {
            return self.units;
        }

        function save(recipe,photoRecipe) {
            blockUI.start();
            recipe.image_url = imgService.getUrlImgRecipe(recipe.name); 
            recipeFactory.save(mapRecipeFromView(recipe), function (persistedRecipe) {
                angular.forEach(recipe.ingredients, function (ing) {
                    ingredientPerRecipeFactory.save(mapIngFromView(ing, persistedRecipe),function (res) {
                    });
                  
                })
                imgService.uploadImgRecipe(recipe.name, photoRecipe);
                notifyHelper.success('Su receta ha sido guardada exitosamente');
            });
            blockUI.stop();
        }

        function create() {
            return new Recipe(UserSession.getUserId(),null,[],[],null,null);
        }

        function mapRecipeFromView(recipe) {
            return {
                name:recipe.name,
                image_url: recipe.image_url,
                description: recipe.description,
                steps:recipe.steps
            }
        }

        function mapIngFromView(ing,recipe) {
            return {
                ingredient_id:ing.id,
                recipe_id:recipe.id,
                amount: ing.quantity,
                unit: ing.unit.name     
            }
        }

        function refresh() {
            $interval(init,20000);
        }
};
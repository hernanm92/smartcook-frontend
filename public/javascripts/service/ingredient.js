angular
    .module('MainApp')
    .service('ingredientService', ingredientService);
    
    function ingredientService(ingredientFactory, $interval) {
        var self = this;
        self.ingredients = [];
        self.getIngredientsBy = getIngredientsBy;
        self.refresh = refresh;
        self.getIngredients = getIngredients;

        init();
        refresh();

        function init() {
            ingredientFactory.query({},function(ings){
                self.ingredients = ings;
            })
        }

        function getIngredientsBy(query) {
            return self.ingredients.filter(function(ing) {
                return ing.name.toLowerCase().indexOf(query.toLowerCase()) != -1;});
        }

        function refresh() {
           $interval(init,20000);
        }

        function getIngredients() {
            return self.ingredients;
        }
    }
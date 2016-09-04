angular
    .module('MainApp')
    .service('ingredientService', ingredientService);
    
    function ingredientService(ingredientFactory) {
        var self = this;
        self.ingredients = [];
        self.getIngredientsBy = getIngredientsBy;

        init();

        function init() {
            ingredientFactory.query({},function(ings){
                self.ingredients = ings;
            })
        }
        
        function getIngredientsBy(query) {
            return self.ingredients.filter(function(ing) {
                return ing.name.toLowerCase().indexOf(query.toLowerCase()) != -1;});
        }
    }
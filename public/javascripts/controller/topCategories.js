app.controller('TopCategoriesController',
    function ($scope, recipeFactory, $location) {
        $scope.recipes = recipeFactory.query();
        $scope.getDetailsRecipe = getDetailsRecipe;
        $scope.clickCategory = clickCategory;
        $scope.hasSelectedCategory = false;

        function getDetailsRecipe(id) {
            $location.path('/recipe/' + id + '/detail');
        }

        function clickCategory($event){
            $scope.hasSelectedCategory = true;
            $($event.target).closest('div.row').find('div').removeClass("topCategories-selectedCategory");
            $($event.target).closest('div').addClass("topCategories-selectedCategory");
        }
    }
);

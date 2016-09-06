app.controller('ProfileController',
    function ($scope,restrictionFactory,ingredientFactory, categoriesFactory, userFactory, UserSession, ingredientService) {
        $scope.user = {};
        $scope.categories = [];
        loadUser();
        $scope.restrictions = loadRestrictions();
        $scope.restrictionsSelection = ['Vegetariano']; // TODO: Load selected mock
        $scope.userRecipes = [
            {
            photo:'img/chicken-potatoe.jpg',
            name:'Chicken Potatoe'
            },
            {
            photo:'img/chicken-potatoe.jpg',
                    name:'Chicken Potatoe'
            },
            {
            photo:'img/chicken-potatoe.jpg',
                    name:'Chicken Potatoe'
            },
            {
            photo:'img/chicken-potatoe.jpg',
            name:'Chicken Potatoe'
            }
        ];

        init();

        function init() {
            categoriesFactory.query({},function (categories) {
                $scope.categories = categories;
            });    
        }

        $scope.toggleSelection = function toggleSelection(restriction) { // toggle selection for a given fruit by name
            var index = $scope.restrictionsSelection.indexOf(restriction);
            if (index > -1) { // is currently selected
                $scope.restrictionsSelection.splice(index,1)
            }
            else {
                $scope.restrictionsSelection.push(restriction);// is newly selected
            }
        }

        $scope.loadExcludedCategories = function(query) {
            return $scope.categories.filter(function(category) {
                return category.name.toLowerCase().indexOf(query.toLowerCase()) != -1;});
        };

        $scope.loadExcludedIngredients = function(query) {
            return ingredientService.getIngredientsBy(query);
        };

        function loadRestrictions(){
            return restrictionFactory.query({},function(response){
                return response.data;
            });
        }

        function loadUser(){
            $scope.user = UserSession.profileInfo();
        }
    }
);

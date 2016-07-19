app.controller('ProfileController',
    function ($scope,restrictionFactory,ingredientFactory, categoriesFactory) {
        $scope.userName = 'Nombre de Usuario';
        $scope.userEmail = 'Email@emaildeejemplo.com';
        $scope.restrictions = loadRestrictions();
        $scope.restrictionsSelection = ['Vegetariano']; // selected restrictions
        $scope.userAvatar = 'img/profile-avatar.jpg';
        $scope.excludedCategories = [];
        $scope.excludedIngredients= [];
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
        $scope.toggleSelection = function toggleSelection(restriction) { // toggle selection for a given fruit by name
            var index = $scope.restrictionsSelection.indexOf(restriction);
            if (index > -1) { // is currently selected
                $scope.restrictionsSelection.splice(index,1)
            }
            else {
                $scope.restrictionsSelection.push(restriction);// is newly selected
            }
        }

        $scope.loadExcludedCategories = function(text) {
            return categoriesFactory.query({text:text}).$promise;
        };

        $scope.loadExcludedIngredients = function(text) {
            return ingredientFactory.query({text:text}).$promise;
        };

        function loadRestrictions(){
            return restrictionFactory.query({},function(response){
                return response.data;
            });
        }
    }
);

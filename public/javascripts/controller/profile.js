app.controller('ProfileController',
    function ($scope,restrictionFactory,ingredientFactory) {
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
            var index = $scope.selection.indexOf(restriction);
            if (index > -1) { // is currently selected
                $scope.selection.splice(index,1)
            }
            else {
                $scope.selection.push(restriction);// is newly selected
            }
        }

//        $scope.loadExcludedCategories = function(query) {
//            return $http.get('/categories?query=' + query);
//        };

        $scope.loadExcludedIngredients = function(text) {
            return ingredientFactory.query({text:text}).$promise;
            //return $http.get('/ingredients?query=' + query);
        };

        function loadRestrictions(){
            return restrictionFactory.query({},function(response){
                return response.data;
            });
        }
    }
);

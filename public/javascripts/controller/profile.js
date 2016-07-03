app.controller('ProfileController',
    function ($scope) {
        $scope.userName = 'Nombre de Usuario';
        $scope.userEmail = 'Email@emaildeejemplo.com';
        $scope.userRestrictions = ['Vegano','Vegetariano','Celiaco','Diabetico'];
        $scope.restrictionsSelection = ['Vegetariano']; // selected restrictions
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
    }
);

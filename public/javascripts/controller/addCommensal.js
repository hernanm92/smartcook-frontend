app.controller('AddCommensalController',
    function ($scope, userFactory, frequentCommensalFactory, UserSession) {
        $scope.searchedUser = "";
        $scope.resultUsers = [];
        $scope.frequentCommensals = [];
        $scope.frequentUsers = [];
        $scope.updateSearchedUsers = updateSearchedUsers;
        $scope.hoverAddCommensalButton = hoverAddCommensalButton;
        $scope.addCommensal = addCommensal;
        $scope.removeCommensal = removeCommensal;

        userFactory.query({}, function (users) {
            $scope.users = users;
        });
        UserSession.getProfile().then(function(val){
            $scope.currentUser = val.username;
            userFactory.query({chef: $scope.currentUser},function(results){
                results.length > 0 ?$scope.frequentUsers = results: null; 
                $scope.frequentCommensals = $($scope.users).filter(function() {
                    return $scope.frequentUsers.indexOf(this.username.toLowerCase()) >= 0;  
                });
            });
        });

        function updateSearchedUsers(){
            $scope.resultUsers = $($scope.users).filter(function() {
                return (this.username.toLowerCase().indexOf($scope.searchedUser.toLowerCase()) != -1
                    && $scope.frequentUsers.indexOf(this.username.toLowerCase()) == -1
                    && this.username.toLowerCase() != $scope.currentUser);
            });
        };

        function hoverAddCommensalButton($event){
            $($event.currentTarget).toggleClass('fa-star-o').toggleClass('fa-star');
        }

        function addCommensal($event){
            var addedUser = getUserByUsername($($event.currentTarget).closest('div').find('h2').text().trim());
            $scope.frequentCommensals.push(addedUser);
            $scope.frequentUsers.push(addedUser.username);
            removeUserByUsername(addedUser.username,$scope.resultUsers);
        }

        function removeCommensal($event){
            var removedUser = getUserByUsername($($event.currentTarget).closest('div').find('h2').text().trim());
            removeUserByUsername(removedUser.username,$scope.frequentCommensals);
            $scope.frequentUsers.splice($scope.frequentUsers.indexOf(removedUser.username),1);
        }

        function removeUserByUsername(username,array){
            var removedUser = getUserByUsername(username);
            for(var i = 0; i < array.length; i++){
                if(array[i].id == removedUser.id){
                    array.splice(i,1);
                    break;
                }
            }
        }

        function getUserByUsername(username){
            var user = $($scope.users).filter(function(){
                return this.username.toLowerCase() == username;
            });
            return user[0];
        }

    }
);


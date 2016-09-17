app.controller('AddCommensalController',
    function ($scope, userFactory, frequentCommensalFactory, UserSession) {
        $scope.searchedUser = "";
        $scope.resultUsers = [];
        $scope.frequentCommensals = [];
        $scope.updateSearchedUsers = updateSearchedUsers;
        $scope.hoverAddCommensalButton = hoverAddCommensalButton;
        $scope.addCommensal = addCommensal;
        $scope.removeCommensal = removeCommensal;

        $scope.users = userFactory.query();
        UserSession.profileInfo().$promise.then(function(val){
            $scope.currentUser = val.userName;
            frequentCommensalFactory.query({username: $scope.currentUser},function(results){
                $scope.frequentUsers = results;
                $scope.frequentCommensals = $($scope.users).filter(function() {
                    return $scope.frequentUsers.indexOf(this.userName.toLowerCase()) >= 0;
                });
            });
        });

        function updateSearchedUsers(){
            $scope.resultUsers = $($scope.users).filter(function() {
                return (this.userName.toLowerCase().indexOf($scope.searchedUser.toLowerCase()) != -1
                    && $scope.frequentUsers.indexOf(this.userName.toLowerCase()) == -1
                    && this.userName.toLowerCase() != $scope.currentUser);
            });
        };

        function hoverAddCommensalButton($event){
            $($event.currentTarget).toggleClass('fa-star-o').toggleClass('fa-star');
        }

        function addCommensal($event){
            var addedUser = getUserByUsername($($event.currentTarget).closest('div').find('h2').text().trim());
            $scope.frequentCommensals.push(addedUser);
            $scope.frequentUsers.push(addedUser.userName);
            removeUserByUsername(addedUser.userName,$scope.resultUsers);
        }

        function removeCommensal($event){
            var removedUser = getUserByUsername($($event.currentTarget).closest('div').find('h2').text().trim());
            removeUserByUsername(removedUser.userName,$scope.frequentCommensals);
            $scope.frequentUsers.splice($scope.frequentUsers.indexOf(removedUser.userName),1);
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
                return this.userName.toLowerCase() == username;
            });
            return user[0];
        }

    }
);


app.controller('AddCommensalController',
    function ($scope, userFactory, frequentCommensalFactory, UserSession) {
        $scope.searchedUser = "";
        $scope.resultUsers = [];
        $scope.updateSearchedUsers = updateSearchedUsers;
        $scope.hoverAddCommensalButton = hoverAddCommensalButton;
        $scope.addCommensal = addCommensal;
        $scope.removeCommensal = removeCommensal;
        $scope.addCommensalButtonHover = false;

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
                    && $scope.frequentUsers.indexOf(this.userName.toLowerCase()) == -1);
            });
        };

        function hoverAddCommensalButton($event){
            $($event.currentTarget).toggleClass('fa-star-o').toggleClass('fa-star');
        }

        function addCommensal($event){

        }

        function removeCommensal($event){

        }

    }
);


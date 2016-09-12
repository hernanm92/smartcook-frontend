app.controller('AddCommensalController',
    function ($scope, userFactory) {
        $scope.searchedUser = "";
        $scope.resultUsers = [];
        $scope.updateSearchedUsers = updateSearchedUsers;
        $scope.hoverAddCommensalButton = hoverAddCommensalButton;
        $scope.addCommensalButtonHover = false;

        function hoverAddCommensalButton($event){
            $($event.currentTarget).toggleClass('fa-star-o').toggleClass('fa-star');
        }

        function updateSearchedUsers(){
            var users = userFactory.query(function(){
                $scope.resultUsers = $(users).filter(function() {
                return this.userName.toLowerCase().indexOf($scope.searchedUser.toLowerCase()) != -1;
                });
            });
        };

    }
);


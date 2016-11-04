app.controller('AddCommensalController',
    function ($scope, userFactory, frequentCommensalFactory, UserSession, commensalPerUserFactory) {
        $scope.searchedUser = "";
        $scope.resultUsers = [];
        $scope.frequentCommensals = [];
        $scope.frequentUsers = [];
        $scope.updateSearchedUsers = updateSearchedUsers;
        $scope.hoverAddCommensalButton = hoverAddCommensalButton;
        $scope.addCommensal = addCommensal;
        $scope.removeCommensal = removeCommensal;

        init();

        /*UserSession.getProfile().then(function (val) {
            $scope.currentUser = val.username;
            commensalPerUserFactory.query({ id: $scope.currentUser }, function (frequentUsers) {
                addUserCommensals(frequentUsers);
                frequentUsers.length > 0 ? $scope.frequentUsers = getUsernamesOf(frequentUsers) : null;
                $scope.frequentCommensals = $($scope.users).filter(function () {
                    return $scope.frequentUsers.indexOf(this.username.toLowerCase()) >= 0;
                });
            });
        });*/

        function init() {
            userFactory.query({}, function (users) {
                $scope.users = users;
            });
            commensalPerUserFactory.query({ id: UserSession.getUsername() }, function (frequentUsers) {
                addUserCommensals(frequentUsers);
            });
        }

        function addUserCommensals(frequentUsers) {
            angular.forEach(frequentUsers, function (frequentUser) {
                $scope.frequentCommensals.push(frequentUser);
            })
        }

        function updateSearchedUsers() {
            $scope.resultUsers = $scope.users.filter(function (user) {
                return isSearchedUser(user) && isNotFrequentUser(user) && isNotMe(user) && $scope.searchedUser != ''
            });
        };

        function isNotFrequentUser(user) {
            var isNotUser = true
            angular.forEach($scope.frequentCommensals, function (frequentUser) {
                if (frequentUser.username === user.username) {
                    isNotUser = false;
                }
            })
            return isNotUser;
        }

        function isNotMe(user) {
            return user.username != UserSession.getUsername();
        }

        function isSearchedUser(user) {
            return user.username.toLowerCase().indexOf($scope.searchedUser.toLowerCase()) != -1
        }

        function hoverAddCommensalButton($event) {
            $($event.currentTarget).toggleClass('fa-star-o').toggleClass('fa-star');
        }

        function addCommensal(user, index) {
            //var addedUser = getUserByUsername($($event.currentTarget).closest('div').find('h2').text().trim());
            removeUserFrom($scope.resultUsers, index);
            $scope.frequentCommensals.push(user);
            var frequentCommensal = {
                frequent_username: user.username,
                username: UserSession.getUsername()
            }
            frequentCommensalFactory.save(frequentCommensal, function (res) {
            });
        }

        function removeCommensal(user, index) {
            //var removedUser = getUserByUsername($($event.currentTarget).closest('div').find('h2').text().trim());
            removeUserFrom($scope.frequentCommensals, index);
            $scope.frequentUsers.splice($scope.frequentUsers.indexOf(user.username), 1);
            var frequentCommensal = {
                frequent_username: user.username,
                username: UserSession.getUsername()
            }
            frequentCommensalFactory.remove(frequentCommensal, function (res) {
            });
        }

        function removeUserFrom(array, index) {
            array.splice(index, 1);
        }

        function getUserByUsername(username) {
            var user = $($scope.users).filter(function () {
                return this.username.toLowerCase() == username;
            });
            return user[0];
        }

        function getUsernamesOf(array) {
            var arrayOfUsernames = [];
            angular.forEach(array, function (elem) {
                arrayOfUsernames.push(elem.frequent_username);
            })
            return arrayOfUsernames;
        }

    }
);


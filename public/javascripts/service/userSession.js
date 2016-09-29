
angular
    .module('MainApp')
    .service('UserSession', UserSession);

function UserSession($sessionStorage, $localStorage, userFactory, categoriesFactory, Profile,
    recipeFactory, $q, mapperService, blockUI) {
    var self = this;
    self.getUsername = getUsername;
    self.deleteUser = deleteUser;
    self.getToken = getToken;
    self.setUser = setUser;
    self.getUserId = getUserId;
    self.isLogged = isLogged;
    self.getProfile = getProfile;
    self.getCategories = getCategories;
    self.initProfileUser = initProfileUser;
    self.getUserProfile = getUserProfile;

    init();

    function init() {
        if (isLogged()) {
            getEntireProfile(getUsername());
        } else {
            self.userProfile = new Profile(null, null, null, [], [], [], null, null, null, null);
        }
    }

    function setUser(user) {
        if (user.remember) {
            $localStorage.remember = true;
            $localStorage.userName = user.userName;
            $localStorage.token = user.token;
            $localStorage.id = user.id;
        }
        if (!user.remember) {
            $sessionStorage.userName = user.userName;
            $sessionStorage.token = user.token;
            $sessionStorage.id = user.id;
        }
    }

    function getUsername() {
        if ($localStorage.remember) {
            return $localStorage.userName;
        }
        return $sessionStorage.userName;
    }

    function getToken() {
        if ($localStorage.remember) {
            return $localStorage.token;
        }
        return $sessionStorage.token;
    }

    function getUserId() {
        if ($localStorage.remember) {
            return $localStorage.id;
        }
        return $sessionStorage.id;
    }

    function deleteUser() {
        if ($localStorage.remember) {
            delete $localStorage.userName;
            delete $localStorage.token;
            delete $localStorage.remember;
            delete $localStorage.id;
            return;
        }
        delete $sessionStorage.userName;
        delete $sessionStorage.token;
        delete $sessionStorage.id;
        self.userProfile = new Profile(null, null, null, [], [], [], null, null, null, null);
    }

    function isLogged() {
        return self.getToken();
    }

    function getProfile() {
        return userFactory.get({username:getUsername()}).$promise;
    }

    function getCategories() {
        return categoriesFactory.query({ username: getUsername() }).$promise;
    }

    function getEntireProfile(username) {
        blockUI.start();
        var promises = {
            profile: self.getProfile(),
            categoriesUser: self.getCategories(),
            recipes: recipeFactory.query({ username: username }).$promise
        };
        $q.all(promises).then(function (values) {
            blockUI.stop();
            return self.userProfile = mapperService.mapProfileToModel(values.profile, values.categoriesUser, values.recipes);
        });
    }

    function getUserProfile() {
        return self.userProfile;
    }

    function initProfileUser(username) {
        getEntireProfile(username);
    }
}

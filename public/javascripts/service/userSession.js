
angular
    .module('MainApp')
    .service('UserSession', UserSession);

function UserSession($sessionStorage, $localStorage, userFactory, categoriesFactory, Profile,
    recipeFactory, $q, mapperService, blockUI, ingredientFactory) {
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
    self.isAdmin = isAdmin

    init();

    function isAdmin() {
        if ($localStorage.remember) {
            return $localStorage.admin;
        }
        return $sessionStorage.admin;
    }

    function init() {
        if (isLogged()) {
            getEntireProfile(getUsername());
        } else {
            self.userProfile = new Profile(null, null, null, [], [], [], null, null, null, null);
        }
    }

    function setUser(token, username, remember, isAdmin) {
        if (remember) {
            $localStorage.remember = true;
            $localStorage.userName = username;
            $localStorage.token = token;
            $localStorage.admin = isAdmin;
        }
        if (!remember) {
            $sessionStorage.userName = username;
            $sessionStorage.token = token;
            $sessionStorage.admin = isAdmin;
        }
        //ubicar el token en el header en el campo autorizacion para validar cada request
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
            delete $localStorage.admin;
            return;
        }
        delete $sessionStorage.userName;
        delete $sessionStorage.token;
        delete $localStorage.admin;
        self.userProfile = new Profile(null, null, null, [], [], [], null, null, null, null);
    }

    function isLogged() {
        return self.getToken();
    }

    function getProfile() {
        return userFactory.get({ username: getUsername() }).$promise;
    }

    function getCategories() {
        return categoriesFactory.query({ username: getUsername() }).$promise;
    }

    function getEntireProfile(username) {
        blockUI.start();
        var promises = {
            profile: self.getProfile(),
            categoriesUser: self.getCategories(),
            recipes: recipeFactory.query({ username: username, owner: true }).$promise,
            ingredients: ingredientFactory.query({ username: getUsername() }).$promise
        };
        $q.all(promises).then(function (values) {
            blockUI.stop();
            return self.userProfile = mapperService.mapProfileToModel(values.profile, values.categoriesUser, values.recipes, values.ingredients); //values.ingredients
        });
    }

    function getUserProfile() {
        return self.userProfile;
    }

    function initProfileUser(username) {
        getEntireProfile(username);
    }
}

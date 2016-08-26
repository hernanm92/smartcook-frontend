
angular
    .module('MainApp')
    .service('UserSession', UserSession);

function UserSession($sessionStorage, $localStorage, userFactory) {
    var self = this;
    self.getUsername = getUsername;
    self.deleteUser = deleteUser;
    self.getToken = getToken;
    self.setUser = setUser;
    self.profileInfo = profileInfo;
    self.getUserId = getUserId;
    
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
    }

    function profileInfo() {
        return userFactory.get({ id: getUserId() }, function (userProfile) {
            return userProfile;
        })
    }
}

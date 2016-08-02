
angular
    .module('MainApp')
    .service('UserSession', UserSession);

function UserSession($sessionStorage, $localStorage) {
    var service = {
        getUsername: getUsername,
        deleteUser: deleteUser,
        getToken: getToken,
        setUser: setUser
    }
    return service;

    function setUser(user) {
        if (user.rememberUser) {
            $localStorage.remember = true;
            $localStorage.username = user.username;
            $localStorage.token = user.token;

        } else {
            $sessionStorage.username = user.username;
            $sessionStorage.token = user.token;
        }
    }

    function getUsername() {
        if ($localStorage.remember) {
            return $localStorage.username;
        }
        return $sessionStorage.username;
    }

    function getToken() {
        if ($localStorage.remember) {
            return $localStorage.token;
        }
        return $sessionStorage.token;
    }

    function deleteUser() {
        if ($localStorage.remember) {
            delete $localStorage.username;
            delete $localStorage.token;
            delete $localStorage.remember;
            return;
        }
        delete $sessionStorage.username;
        delete $sessionStorage.token;
    }
}

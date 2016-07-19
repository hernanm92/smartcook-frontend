
angular
    .module('MainApp')
    .service('UserSession',UserSession);

function UserSession($sessionStorage) {
    var service = {
        //services
        setUsername:setUsername,
        getUsername:getUsername,
        deleteUser:deleteUser,
        setToken :setToken,
        getToken:getToken
    }
    return service;

    function setUsername(username) {
        $sessionStorage.username = username;
    }

    function getUsername() {
        return $sessionStorage.username;
    }

    function setToken(token) {
        $sessionStorage.token = token;
    }

    function getToken() {
        return $sessionStorage.token;
    }

    function deleteUser() {
        delete $sessionStorage.username;
        delete $sessionStorage.token;
    }
}


angular
    .module('MainApp')
    .service('UserSession',UserSession);

function UserSession($localStorage) {
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
        $localStorage.username = username;
    }

    function getUsername() {
        return $localStorage.username;
    }

    function setToken(token) {
        $localStorage.token = token;
    }

    function getToken() {
        return $localStorage.token;
    }

    function deleteUser() {
        delete $localStorage.username;
        delete $localStorage.token;
    }
}

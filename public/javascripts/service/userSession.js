
angular
    .module('MainApp')
    .service('UserSession', UserSession);

function UserSession($sessionStorage, $localStorage) {
    var service = {
        getUsername: getUsername,
        deleteUser: deleteUser,
        getToken: getToken,
        setUser: setUser,
        watchAuthenticationStatusChange: watchAuthenticationStatusChange
    }
    return service;

    function setUser(user) {
        if (user.remember) {
            $localStorage.remember = true;
            $localStorage.username = user.username;
            $localStorage.token = user.token;

        }
        if(!user.remember){
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

    function watchAuthenticationStatusChange() {

        FB.Event.subscribe('auth.authResponseChange', function (res) {

            if (res.status === 'connected') {
                console.log(res);
                $localStorage.remember = true;
                $localStorage.username = getUserInfo();
                $localStorage.token = res.authResponse.accessToken;  
            }
            if( res.status ==='not_authorized'){
                console.log('no logueado en la app');
                deleteUser();
            }
            if(res.status ==='unknown'){
                deleteUser();
                console.log('no esta logueado en ningun lado');
            }
        });
    }
}

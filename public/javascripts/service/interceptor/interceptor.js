angular
    .module('MainApp')
    .service('httpInterceptorService', httpInterceptorService);

    function httpInterceptorService($q,notifyHelper) {
        
        return{
            'responseError': responseError
        }

        function responseError(response) {
            notifyHelper.error('Surgio un problema en el servidor, reintente de nuevo.Disulpe las molestias');
            return $q.reject(response);
        }
    }

angular
    .module('MainApp')
    .service('httpInterceptorService', httpInterceptorService);

function httpInterceptorService($q, notifyHelper, blockUI) {

    return {
        'responseError': responseError
    }

    function responseError(response) {
        blockUI.stop();
        if (response.status === 403) {
            //login incorrecto
            var recoverResponse = { 
                status : 200,
                data : response.data
            }
            return recoverResponse;
        }
        notifyHelper.error('Surgio un problema en el servidor, reintente de nuevo.Disulpe las molestias');
        return $q.reject(response);
    }
}

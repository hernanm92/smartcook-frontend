angular
    .module('MainApp')
    .service('httpInterceptorService', httpInterceptorService);

function httpInterceptorService($q, $injector, blockUI) {

    return {
        'responseError': responseError
    }

    function responseError(response) {
        var notifyHelper = $injector.get('notifyHelper');
        blockUI.stop();
        if (response.status === 403) {
            //login incorrecto
            var recoverResponse = {
                status: 200,
                data: response.data
            }
            return recoverResponse;
        }
        if (response.status === 422) {
            notifyHelper.error("No se pudo realizar la transaccion");
            return $q.reject(response);
        }
        notifyHelper.error('Hubo un problema en el servidor, reintente de nuevo.');
        return $q.reject(response);
    }
}

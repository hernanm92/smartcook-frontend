
angular
    .module('MainApp')
    .service('azureService', azureService);

function azureService($http) {
    var self = this;
    self.getUrlTokenSas = getUrlTokenSas;
    self.getUrl = getUrl;
    self.getBlob = getBlob;

    function getTokenSas(settings) {
        return $http.get('http://localhost:8080/sas', { params: settings });
    }

    function getUrlTokenSas(blobName, container) {
        var settings = { blobName: blobName, container: container }
        return getTokenSas(settings);
    }
    function getUrl() {
        return 'https://imgsmartcook.blob.core.windows.net';
    }

    function getBlob() {
       return $http.get('https://imgsmartcook.blob.core.windows.net/recipes/asda')
    }

}
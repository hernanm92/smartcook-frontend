
angular
    .module('MainApp')
    .service('azureService', azureService);

function azureService($http, azureBlob) {
    var self = this;
    var azureUrl = 'https://imgsmartcook.blob.core.windows.net';
    self.upload = upload;
    self.getUrlImg = getUrlImg;

    function upload(name, photoFile, container) {
        var settings = { name: photoFile.name, container: container }
        getTokenSas(settings).then(function (sasToken) {
            azureBlob.upload({
                baseUrl: getUrlImg(name, container),
                sasToken: '?'+ sasToken.data,
                file: photoFile,
                complete: function (res) {
                },
                blockSize: photoFile.size
            })
        })
    }

    function getTokenSas(settings) {
        return $http.get('http://localhost:8080/sas', { params: settings });
    }

    function getUrlImg(nameBlob, container) {
        return azureUrl + '/' + container + '/' + nameBlob;
    }
}
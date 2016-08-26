angular
    .module('MainApp')
    .service('imgService', imgsService);

function imgsService(Upload, azureService, blockUI) {

    var self = this;
    self.uploadImg = uploadImg;
    self.getUrlImg = getUrlImg;
    self.getImage = getImage;

    function uploadImg(namePhoto, photoFile, container) {
        blockUI.start();
        azureService.getUrlTokenSas(namePhoto, container).then(function (storageUrl) {
            photoFile.name = namePhoto;
            Upload.upload({
                url: storageUrl.data,
                method: 'PUT',
                headers: {
                    'x-ms-blob-type': 'BlockBlob',
                    'x-ms-blob-content-type': photoFile.type,
                    'Content-Type':photoFile.type
                },
                data: { file: photoFile }
            }).then(function (response) {
                blockUI.stop();
            });
        })
    }

    function getUrlImg(nameRecipe, container) {
        var azureUrl = azureService.getUrl();
        var name = nameRecipe;
        return azureUrl + '/' + container + '/' + nameRecipe;
    }

    function getImage() {
        return azureService.getBlob();
    }
}
angular
    .module('MainApp')
    .service('imgService', imgsService);

function imgsService(azureService) {

    var self = this;
    self.uploadImgRecipe = uploadImgRecipe;
    self.uploadImgProfile = uploadImgProfile;
    self.uploadImgIngredient = uploadImgIngredient;
    self.getUrlImgRecipe = getUrlImgRecipe;
    self.getUrlImgIngredient = getUrlImgIngredient;
    self.getUrlImgProfile =  getUrlImgProfile; 

    function uploadImgProfile(name, photoFile) {
        return azureService.upload(photoFile, 'profile');
    }

    function uploadImgIngredient(name, photoFile) {
        return azureService.upload(photoFile, 'ingredients');
    }

    function uploadImgRecipe(name, photoFile) {
        return azureService.upload(name, photoFile, 'recipes');
    }

    function getUrlImgRecipe(name) {
        return azureService.getUrlImg(name, 'recipes');
    }

    function getUrlImgIngredient(name) {
        return azureService.getUrlImg(name, 'ingredients');
    }

    function getUrlImgProfile(name) {
        return azureService.getUrlImg(name, 'profile');
    }
}
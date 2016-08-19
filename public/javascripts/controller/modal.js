app.controller('ModalController', function ($scope,$modalInstance,message,title) {

    $scope.title = title;
    $scope.message = message; 

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
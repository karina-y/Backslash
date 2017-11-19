(function () {
    "use strict";

    angular.module(APPNAME)
    .controller('profileModalController', ProfileModalController);

    ProfileModalController.$inject = ['$scope', '$baseController', '$uibModalInstance', 'modalItem', '$fileReaderService', '$cropService']

    function ProfileModalController(
        $scope
        , $baseController
        , $uibModalInstance
        , modalItem
        , $fileReaderService
        , $cropService
        ) {

        var vm = this;

        $baseController.merge(vm, $baseController);

        vm.$scope = $scope;
        vm.$uibModalInstance = $uibModalInstance;
        vm.$fileReaderService = $fileReaderService;
        vm.$cropService = $cropService;
        vm.modalMsg = modalItem;

        vm.cancel = _cancel;
        vm.readFile = _readFile;
        vm.resetCanvas = _resetCanvas;
        vm.saveCroppedImage = _saveCroppedImage;

        vm.fileName = null;
        vm.croppedImage = null;


        function _readFile(file) {
            //console.log("hit"); 

            vm.resetCanvas();
            //$scope.progress = 0;
            //var file = document.getElementById("tempFile").files[0];

            //if (vm.canvasImg.width > (screen.width * .8)) {
            //    vm.canvasImg.width = screen.width * .8;
            //    $(vm.canvasImg.src).width(vm.canvasImg.width);
            //}

            file = file.files[0];

            vm.fileName = file.name;

            vm.$fileReaderService.readAsDataURL(file)
                .then(function (result) {
                    vm.$cropService.initCropModal(result);
                });
        };

        //vm.$scope.$on("fileProgress", function (e, progress) {
        //    $scope.progress = progress.loaded / progress.total;
        //});

        function _resetCanvas() {
            //vm.croppedImage = null;
            $('#cropResult').hide();
            $('#cropCanvas').show();
        }


        function _cancel() {
            vm.$uibModalInstance.close();
        };

        function _saveCroppedImage() {
            vm.croppedImage = $('#cropResult').attr('src');

            var response = {};
            response.success = true;
            response.fileName = vm.fileName;
            response.croppedImage = vm.croppedImage;

            vm.$uibModalInstance.close(response);
            return vm.croppedImage;
        }
    }
})();